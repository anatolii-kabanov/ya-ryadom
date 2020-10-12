using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;
using YaRyadom.Vk;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class MyEventsService : BaseService<YaRyadomEvent>, IMyEventsService
	{
		private readonly IMapper _mapper;
		private readonly IVkApi _vkApi;

		public MyEventsService(YaRyadomDbContext dbContext, IMapper mapper, IVkApi vkApi) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
		}

		public async Task<bool> AddAsync(EventFormModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomEvent = _mapper.Map<YaRyadomEvent>(model);

			var dateTime = yaRyadomEvent.Date.Value.Add(yaRyadomEvent.Time.Value);

			if (dateTime.UtcDateTime < DateTime.UtcNow)
			{
				return false;
			}

			var yaRyadomUser = await _dbContext
				.YaRyadomUsers
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			foreach (var theme in model.SelectedThemes)
			{
				_dbContext.YaRyadomEventThemes.Add(
					new YaRyadomEventTheme
					{
						Type = (ThemeType)theme,
						YaRyadomEvent = yaRyadomEvent
					});
			}

			yaRyadomEvent.YaRyadomUserOwner = yaRyadomUser;

			Entities.Add(yaRyadomEvent);

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> RevokeAsync(EventActionRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomEvent = await Entities.FirstOrDefaultAsync(
				m => m.Id == model.EventId && m.YaRyadomUserOwner.VkId == model.VkUserId,
				cancellationToken)
				.ConfigureAwait(false);

			if (yaRyadomEvent == null) return false;

			var usersIds = await _dbContext
				.YaRyadomUserApplications
				.AsNoTracking()
				.Where(m => m.YaRyadomEventId == yaRyadomEvent.Id
					&& m.Status != ApplicationStatus.Rejected
					&& m.Status != ApplicationStatus.None
					&& m.YaRyadomUserRequested.NotificationsEnabled)
				.Select(m => m.YaRyadomUserRequestedId)
				.ToArrayAsync(cancellationToken);

			foreach (var userId in usersIds)
			{
				_dbContext.YaRyadomNotifications.Add(new YaRyadomNotification
				{
					CreatedDate = DateTime.UtcNow,
					NotificationType = NotificationType.EventRevoked,
					YaRyadomEventId = yaRyadomEvent.Id,
					YaRyadomUserToSendId = userId,
				});
			}

			yaRyadomEvent.Revoked = true;
			yaRyadomEvent.Ended = true;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<MyEventModel[]> GetAllMyEvents(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<MyEventServiceModel>(
				  TableNoTracking
					  .Where(m => m.YaRyadomUserOwner.VkId == vkId && !m.Revoked)
					  .OrderBy(m => m.Ended)
					  .ThenBy(m => m.Date)
					  .ThenBy(m => m.Time)
			  )
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = events.SelectMany(e => e.Participants.Select(p => p.VkUserId)).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var participant in events.SelectMany(e => e.Participants).Where(p => p.VkUserId == vkUser.Id))
						{
							participant.VkUserAvatarUrl = vkUser.Photo200Url;
						}
					}
				}
			}

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<MyEventModel[]> GetAllPaticipationEvents(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<MyEventServiceModel>(
				  TableNoTracking
					  .Where(m =>
							m.YaRyadomUserApplications.Any(mm => mm.YaRyadomUserRequested.VkId == vkId && mm.Status == ApplicationStatus.Confirmed)
						)
					  .OrderBy(m => m.Ended)
					  .ThenBy(m => m.Date)
			  )
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = events.SelectMany(e => e.Participants.Select(p => p.VkUserId)).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var participant in events.SelectMany(e => e.Participants).Where(p => p.VkUserId == vkUser.Id))
						{
							participant.VkUserAvatarUrl = vkUser.Photo200Url;
						}
					}
				}
			}

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<MyEventModel[]> GetAllMyEventsWithApplications(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<MyEventWithApplicationsServiceModel>(
				  TableNoTracking
					  .Where(m => m.YaRyadomUserOwner.VkId == vkId)
					  .OrderBy(m => m.Ended)
					  .ThenBy(m => m.Date)
					  .ThenBy(m => m.Time)
			  )
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = events.SelectMany(e => e.Participants.Select(p => p.VkUserId)).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var participant in events.SelectMany(e => e.Participants).Where(p => p.VkUserId == vkUser.Id))
						{
							participant.VkUserAvatarUrl = vkUser.Photo200Url;
						}
					}
				}
			}

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
