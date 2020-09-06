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

namespace YaRyadom.API.Services.Implementations
{
	public class MyEventsService : BaseService<YaRyadomEvent>, IMyEventsService
	{
		private readonly IMapper _mapper;

		public MyEventsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> AddAsync(EventFormModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomEvent = _mapper.Map<YaRyadomEvent>(model);

			var dateTime = yaRyadomEvent.Date.Value.Add(yaRyadomEvent.Time.Value);

			if (dateTime < DateTime.UtcNow)
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

		public async Task<MyEventModel[]> GetAllMyEvents(long vkId, CancellationToken cancellationToken = default)
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

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<MyEventModel[]> GetAllPaticipationEvents(long vkId, CancellationToken cancellationToken = default)
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

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<MyEventModel[]> GetAllMyEventsWithApplications(long vkId, CancellationToken cancellationToken = default)
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

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
