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
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;
using YaRyadom.Vk;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class EventsNearMeService : BaseService<YaRyadomEvent>, IEventsNearMeService
	{
		private readonly IMapper _mapper;
		private readonly GeometryFactory _geometryFactory;
		private readonly IVkApi _vkApi;

		public EventsNearMeService(
			YaRyadomDbContext dbContext,
			IMapper mapper,
			GeometryFactory geometryFactory,
			IVkApi vkApi) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_geometryFactory = geometryFactory ?? throw new ArgumentNullException(nameof(geometryFactory));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
		}

		public async Task<YaRyadomEventModel[]> GetAllEventsByDistance(EventsRequestModel model, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var userPosition = _geometryFactory.CreatePoint(new Coordinate(model.Longitude, model.Latitude));

			model.MaxDistance *= 1000;
			Expression<Func<YaRyadomEvent, bool>> whereExpression = m =>
				m.YaRyadomUserOwner.VkId != model.VkUserId
				&& !m.Ended
				&& m.Location.Distance(userPosition) <= model.MaxDistance;
			if (!string.IsNullOrWhiteSpace(model.SearchText))
			{
				Expression<Func<YaRyadomEvent, bool>> whereTextExpression = m => m.SearchVector.Matches(EF.Functions.PlainToTsQuery("russian", model.SearchText));
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
			.OrderBy(m => m.Distance)
			.ToArrayAsync(cancellationToken)
			.ConfigureAwait(false);

			var vkUserIds = events.Select(e => e.VkUserOwnerId).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var eventNearMe in events.Where(e => e.VkUserOwnerId == vkUser.Id))
						{
							eventNearMe.VkUserAvatarUrl = vkUser.Photo200Url;
							eventNearMe.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
						}
					}
				}
			}

			var resultEvents = events
				.Select(_mapper.Map<YaRyadomEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<YaRyadomEventModel> GetEventById(EventRequestModel model, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default)
		{
			var userPosition = _geometryFactory.CreatePoint(new Coordinate(model.Longitude, model.Latitude));

			var yaRyadomEvent = await TableNoTracking
			.Where(m => m.Id == model.EventId)
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
			.FirstOrDefaultAsync(cancellationToken)
			.ConfigureAwait(false);

			var vkResponse = await _vkApi.GetUserInfoAsync(new string[] { yaRyadomEvent.VkUserOwnerId.ToString() }, vkLanguage, cancellationToken).ConfigureAwait(false);

			if (vkResponse.Response != null && vkResponse.Response.Length > 0)
			{
				var vkUser = vkResponse.Response.First();
				yaRyadomEvent.VkUserAvatarUrl = vkUser.Photo200Url;
				yaRyadomEvent.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
			}

			var result = _mapper.Map<YaRyadomEventModel>(yaRyadomEvent);

			return result;
		}
	}
}
