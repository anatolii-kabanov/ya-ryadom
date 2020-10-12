using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;
using YaRyadom.Vk;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class ApplicationsService : BaseService<YaRyadomUserApplication>, IApplicationsService
	{
		private readonly IMapper _mapper;
		private readonly IVkApi _vkApi;

		public ApplicationsService(YaRyadomDbContext dbContext, IMapper mapper, IVkApi vkApi) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
		}

		public async Task<ApplicationModel[]> GetAllByEventAsync(int eventId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var applications = await _mapper
				.ProjectTo<ApplicationModel>(
					TableNoTracking.Where(m => m.YaRyadomEventId == eventId && m.Status != ApplicationStatus.None)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = applications.Select(a => a.VkUserId).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var application in applications.Where(p => p.VkUserId == vkUser.Id))
						{
							application.VkUserAvatarUrl = vkUser.Photo200Url;
							application.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
						}
					}
				}
			}

			return applications;
		}

		public async Task<bool> ApproveAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await _dbContext
				.YaRyadomUserApplications
				.Where(m => m.Id == model.ApplicationId && m.YaRyadomEvent.YaRyadomUserOwner.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			if (application == null) return false;

			application.Status = ApplicationStatus.Confirmed;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> RejectAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await _dbContext
				.YaRyadomUserApplications
				.Where(m => m.Id == model.ApplicationId
					&& (m.Status == ApplicationStatus.Sent || m.Status == ApplicationStatus.Confirmed)
					&& m.YaRyadomEvent.YaRyadomUserOwner.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			if (application == null) return false;

			application.Status = ApplicationStatus.Rejected;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> ApplyAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			var eventExist = await _dbContext
				.YaRyadomEvents
				.AsNoTracking()
				.AnyAsync(m => m.Id == model.EventId 
					&& !m.Ended && !m.Revoked 
					&& m.YaRyadomUserOwner.VkId != model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (!eventExist) return false;

			var application = await Query
				.Where(m => m.YaRyadomEventId == model.EventId && m.YaRyadomUserRequested.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			if (application != null)
			{
				if (application.Status != ApplicationStatus.None)
				{
					return false;
				}
				application.Status = ApplicationStatus.Sent;
				application.Date = DateTimeOffset.UtcNow.ToOffset(-TimeSpan.FromMinutes(model.TimeZoneMinutes));
			}
			else
			{
				application = _mapper.Map<YaRyadomUserApplication>(model);

				var yaRyadomUser = await _dbContext
					.YaRyadomUsers
					.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
					.ConfigureAwait(false);

				application.YaRyadomUserRequested = yaRyadomUser;

				Entities.Add(application);
			}

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> RevokeAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await Query
				.Where(m => m.Id == model.ApplicationId 
					&& (m.Status == ApplicationStatus.Sent || m.Status == ApplicationStatus.Confirmed)
					&& m.YaRyadomUserRequested.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken)
				.ConfigureAwait(false);

			if (application == null) return false;

			// Move status back
			application.Status = ApplicationStatus.None;
			//application.Revoked = true;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<ApplicationModel[]> GetAllToMeAsync(long vkUserId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var applications = await _mapper
				.ProjectTo<ApplicationModel>(
					TableNoTracking.Where(m => m.YaRyadomEvent.YaRyadomUserOwner.VkId == vkUserId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = applications.Select(a => a.VkUserId).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var application in applications.Where(p => p.VkUserId == vkUser.Id))
						{
							application.VkUserAvatarUrl = vkUser.Photo200Url;
							application.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
						}
					}
				}
			}

			return applications;
		}

		public async Task<MineApplicationModel[]> GetAllMineAsync(long vkUserId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var applications = await _mapper
				.ProjectTo<MineApplicationModel>(
					TableNoTracking.Where(m => m.YaRyadomUserRequested.VkId == vkUserId && !m.Revoked && !m.YaRyadomEvent.YaRyadomReviews.Any(mm => mm.YaRyadomUserReviewer.VkId == vkUserId))
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = applications.Select(a => a.VkUserId).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var application in applications.Where(p => p.VkUserId == vkUser.Id))
						{
							application.VkUserAvatarUrl = vkUser.Photo200Url;
							application.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
						}
					}
				}
			}

			return applications;
		}
	}
}
