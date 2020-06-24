using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaVDele.API.Models;
using YaVDele.API.Models.Requests;
using YaVDele.API.Models.ServiceModels;
using YaVDele.API.Services.Interfaces;
using YaVDele.Domain.DbContexts;
using YaVDele.Domain.Entities;

namespace YaVDele.API.Services.Implementations
{
	public class EventsNearMeService : BaseService<YaVDeleEvent>, IEventsNearMeService
	{
		private readonly IMapper _mapper;
		private readonly GeometryFactory _geometryFactory;

		public EventsNearMeService(YaVDeleDbContext dbContext, IMapper mapper, GeometryFactory geometryFactory) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_geometryFactory = geometryFactory ?? throw new ArgumentNullException(nameof(geometryFactory));
		}

		public async Task<YaVDeleEventModel[]> GetAllEventsByDistance(EventsRequestModel model, CancellationToken cancellationToken = default)
		{
			var userPosition = _geometryFactory.CreatePoint(new Coordinate(model.Longitude, model.Latitude));
			YaVDeleEventServiceModel[] events;
			if (string.IsNullOrWhiteSpace(model.SearchText))
			{
				events = await TableNoTracking
				.Where(m => m.Location.Distance(userPosition) <= model.MaxDistance)
				.Select(m => new YaVDeleEventServiceModel
				{
					Id = m.Id,
					Title = m.Title,
					Description = m.Description,
					Date = m.Date,
					MaxQuantiyty = m.MaxQuantiyty,
					Revoked = m.Revoked,
					VkUserOwnerId = m.YaVDeleUserOwner.VkId,
					Location = m.Location,
					Distance = m.Location.Distance(userPosition),
					VkUserAvatarUrl = m.YaVDeleUserOwner.VkUserAvatarUrl,
					UserFullName = m.YaVDeleUserOwner.FirstName + ' ' + m.YaVDeleUserOwner.LastName
				})
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);
			} else
			{
				events = await TableNoTracking
				.Where(m => m.Location.Distance(userPosition) <= model.MaxDistance && m.SearchVector.Matches(EF.Functions.ToTsQuery("russian",model.SearchText)))
				.Select(m => new YaVDeleEventServiceModel
				{
					Id = m.Id,
					Title = m.Title,
					Description = m.Description,
					Date = m.Date,
					MaxQuantiyty = m.MaxQuantiyty,
					Revoked = m.Revoked,
					VkUserOwnerId = m.YaVDeleUserOwner.VkId,
					Location = m.Location,
					Distance = m.Location.Distance(userPosition),
					VkUserAvatarUrl = m.YaVDeleUserOwner.VkUserAvatarUrl,
					UserFullName = m.YaVDeleUserOwner.FirstName + ' ' + m.YaVDeleUserOwner.LastName
				})
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);
			}			

			var resultEvents = events
				.Select(_mapper.Map<YaVDeleEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
