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

namespace YaRyadom.API.Services.Implementations
{
	public class ApplicationsService : BaseService<YaRyadomUserApplication>, IApplicationsService
	{
		private readonly IMapper _mapper;

		public ApplicationsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<ApplicationModel[]> GetAllByEventAsync(int eventId, CancellationToken cancellationToken = default)
		{
			var applications = await _mapper
				.ProjectTo<ApplicationModel>(
					TableNoTracking.Where(m => m.YaRyadomEventId == eventId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			return applications;
		}

		public async Task<bool> ApproveAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await _dbContext
				.YaRyadomUserApplications
				.Where(m => m.Id == model.ApplicationId && m.YaRyadomEvent.YaRyadomUserOwner.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			application.Status = ApplicationStatus.Confirmed;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> RejectAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await _dbContext
				.YaRyadomUserApplications
				.Where(m => m.Id == model.ApplicationId && m.YaRyadomEvent.YaRyadomUserOwner.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			application.Status = ApplicationStatus.Rejected;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> ApplyAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await Query
				.Where(m => m.YaRyadomEventId == model.EventId && m.YaRyadomUserRequested.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			if (application != null)
			{
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
				.Where(m => m.Id == model.ApplicationId && m.YaRyadomUserRequested.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken)
				.ConfigureAwait(false);

			// Move status back
			application.Status = ApplicationStatus.None;
			//application.Revoked = true;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<ApplicationModel[]> GetAllToMeAsync(int vkUserId, CancellationToken cancellationToken = default)
		{
			var applications = await _mapper
				.ProjectTo<ApplicationModel>(
					TableNoTracking.Where(m => m.YaRyadomEvent.YaRyadomUserOwner.VkId == vkUserId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			return applications;
		}

		public async Task<MineApplicationModel[]> GetAllMineAsync(int vkUserId, CancellationToken cancellationToken = default)
		{
			var applications = await _mapper
				.ProjectTo<MineApplicationModel>(
					TableNoTracking.Where(m => m.YaRyadomUserRequested.VkId == vkUserId && !m.Revoked && !m.YaRyadomEvent.YaRyadomReviews.Any(mm => mm.YaRyadomUserReviewer.VkId != vkUserId))
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			return applications;
		}
	}
}
