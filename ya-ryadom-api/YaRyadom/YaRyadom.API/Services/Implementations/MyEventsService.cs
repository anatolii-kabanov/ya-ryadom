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
			var yaVDeleEvent = _mapper.Map<YaRyadomEvent>(model);

			var yaVDeleUser = await _dbContext
				.YaRyadomUsers
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			foreach (var theme in model.SelectedThemes)
			{
				_dbContext.YaRyadomEventThemes.Add(
					new YaRyadomEventTheme
					{
						Type = (ThemeType)theme,
						YaRyadomEvent = yaVDeleEvent
					});
			}

			yaVDeleEvent.YaVDeleUserOwner = yaVDeleUser;

			Entities.Add(yaVDeleEvent);

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> RevokeAsync(int eventId, CancellationToken cancellationToken = default)
		{
			var yaVDeleEvent = await Entities.FirstOrDefaultAsync(m => m.Id == eventId, cancellationToken);

			yaVDeleEvent.Revoked = true;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<MyEventModel[]> GetAllMyEvents(long vkId, CancellationToken cancellationToken = default)
		{
			var events = await TableNoTracking
				.Where(m => m.YaVDeleUserOwner.VkId == vkId)
				.Select(m => new MyEventServiceModel
				{
					Id = m.Id,
					Title = m.Title,
					Description = m.Description,
					Date = m.Date,
					MaxQuantiyty = m.MaxQuantity,
					Revoked = m.Revoked,
					Location = m.Location,
				})
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var resultEvents = events
				.Select(_mapper.Map<MyEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<bool> ApproveApplicationAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await _dbContext
				.YaRyadomUserApplications
				.Where(m => m.YaRyadomEventId == model.EventId && m.YaRyadomUserRequested.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			application.Status = ApplicationStatus.Confirmed;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> RejectApplicationAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			var application = await _dbContext
				.YaRyadomUserApplications
				.Where(m => m.YaRyadomEventId == model.EventId && m.YaRyadomUserRequested.VkId == model.VkUserId)
				.FirstOrDefaultAsync(cancellationToken);

			application.Status = ApplicationStatus.Rejected;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

	}
}
