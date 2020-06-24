using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaVDele.API.Models;
using YaVDele.API.Models.ServiceModels;
using YaVDele.API.Services.Interfaces;
using YaVDele.Domain.DbContexts;
using YaVDele.Domain.Entities;

namespace YaVDele.API.Services.Implementations
{
	public class MyEventsService : BaseService<YaVDeleEvent>, IMyEventsService
	{
		private readonly IMapper _mapper;

		public MyEventsService(YaVDeleDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> AddAsync(EventFormModel model, CancellationToken cancellationToken = default)
		{
			var yaVDeleEvent = _mapper.Map<YaVDeleEvent>(model);
			var yaVDeleUser = await _dbContext
				.YaVDeleUsers
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

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
					MaxQuantiyty = m.MaxQuantiyty,
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

	}
}
