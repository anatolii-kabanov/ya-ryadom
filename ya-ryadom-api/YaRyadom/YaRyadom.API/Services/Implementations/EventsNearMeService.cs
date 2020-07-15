using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Helpers;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Enums;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.API.Services.Implementations;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;

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

			model.MaxDistance *= 1000;
			Expression<Func<YaRyadomEvent, bool>> whereExpression = m => m.Location.Distance(userPosition) <= model.MaxDistance;
			if (!string.IsNullOrWhiteSpace(model.SearchText))
			{
				Expression<Func<YaRyadomEvent, bool>> whereTextExpression = m => m.SearchVector.Matches(EF.Functions.ToTsQuery("russian", model.SearchText));
				whereExpression = whereExpression.AndAlso(whereTextExpression);
			}

			if (model.Theme != null && model.Theme != 0)
			{
				var themeType = (ThemeType)model.Theme;
				Expression<Func<YaRyadomEvent, bool>> whereThemeExpression = m => m.YaRyadomEventThemes.Any(mm => mm.Type == themeType);
				whereExpression = whereExpression.AndAlso(whereThemeExpression);
			}

			var events = await TableNoTracking
			.Where(whereExpression)
			.Select(m => new YaRyadomEventServiceModel
			{
				Id = m.Id,
				Title = m.Title,
				Description = m.Description,
				Date = m.Date,
				Time = m.Time,
				MaxQuantiyty = m.MaxQuantity,
				Revoked = m.Revoked,
				VkUserOwnerId = m.YaRyadomUserOwner.VkId,
				Location = m.Location,
				Distance = m.Location.Distance(userPosition),
				VkUserAvatarUrl = m.YaRyadomUserOwner.VkUserAvatarUrl,
				ThemeType = m.YaRyadomEventThemes.Select(mm => (ThemeTypeModel)mm.Type).FirstOrDefault(),
				UserFullName = m.YaRyadomUserOwner.FirstName + ' ' + m.YaRyadomUserOwner.LastName,
				ApplicationStatus = m.YaRyadomUserApplications
					.Where(mm => mm.YaRyadomUserRequested.VkId == model.VkUserId)
					.Select(mm => (ApplicationStatusModel)mm.Status)
					.FirstOrDefault()
			})
			.ToArrayAsync(cancellationToken)
			.ConfigureAwait(false);


			var resultEvents = events
				.Select(_mapper.Map<YaRyadomEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
