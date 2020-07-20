using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class UserEventsService : BaseService<YaRyadomEvent>, IUserEventsService
	{
		private readonly IMapper _mapper;

		public UserEventsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<UserEventModel[]> GetCreatedEvents(long vkId, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<UserEventServiceModel>(
				  TableNoTracking.Where(m => m.YaRyadomUserOwner.VkId == vkId)
			  )
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var resultEvents = events
				.Select(_mapper.Map<UserEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<UserEventModel[]> GetVisitedEvents(long vkId, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<UserEventServiceModel>(
				  TableNoTracking
				  .Where(m =>
						m.YaRyadomUserOwner.VkId != vkId
						&& m.YaRyadomUserApplications.Any(mm => mm.YaRyadomUserRequested.VkId == vkId && mm.Status == ApplicationStatus.Visited)
					)
			  )
			.ToArrayAsync(cancellationToken)
			.ConfigureAwait(false);

			var resultEvents = events
				.Select(_mapper.Map<UserEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
