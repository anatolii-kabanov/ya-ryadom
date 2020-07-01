using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.API.Services.Implementations;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Implementations
{
	public class EventsNearMeService : BaseService<YaRyadomEvent>, IEventsNearMeService
	{
		private readonly IMapper _mapper;
		private readonly GeometryFactory _geometryFactory;

		public EventsNearMeService(YaRyadomDbContext dbContext, IMapper mapper, GeometryFactory geometryFactory) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_geometryFactory = geometryFactory ?? throw new ArgumentNullException(nameof(geometryFactory));
		}

		public async Task<YaRyadomEventModel[]> GetAllEventsByDistance(EventsRequestModel model, CancellationToken cancellationToken = default)
		{
			var userPosition = _geometryFactory.CreatePoint(new Coordinate(model.Longitude, model.Latitude));
			YaRyadomEventServiceModel[] events;
			model.MaxDistance *= 1000;
			if (string.IsNullOrWhiteSpace(model.SearchText))
			{
				events = await TableNoTracking
				.Where(m => m.Location.Distance(userPosition) <= model.MaxDistance)
				.Select(m => new YaRyadomEventServiceModel
				{
					Id = m.Id,
					Title = m.Title,
					Description = m.Description,
					Date = m.Date,
					MaxQuantiyty = m.MaxQuantity,
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
			else
			{
				events = await TableNoTracking
				.Where(m => m.Location.Distance(userPosition) <= model.MaxDistance && m.SearchVector.Matches(EF.Functions.ToTsQuery("russian", model.SearchText)))
				.Select(m => new YaRyadomEventServiceModel
				{
					Id = m.Id,
					Title = m.Title,
					Description = m.Description,
					Date = m.Date,
					MaxQuantiyty = m.MaxQuantity,
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
				.Select(_mapper.Map<YaRyadomEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
