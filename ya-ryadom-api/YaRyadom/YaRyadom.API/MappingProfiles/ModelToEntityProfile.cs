using AutoMapper;
using NetTopologySuite.Geometries;
using System;
using System.Globalization;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.API.MappingProfiles
{
	public class ModelToEntityProfile : Profile
	{
		public ModelToEntityProfile(GeometryFactory geometryFactory)
		{
			CreateMap<UserInfoSaveRequestModel, YaRyadomUser>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.GuideCompleted, opt => opt.MapFrom(src => src.GuideCompleted))
				.ForMember(dest => dest.NotificationsEnabled, opt => opt.MapFrom(src => src.NotificationsEnabled))
				.ForMember(dest => dest.GeolocationEnabled, opt => opt.MapFrom(src => src.GeolocationEnabled))
				.ForMember(dest => dest.LastLocation, opt => opt.MapFrom(src => geometryFactory.CreatePoint(new Coordinate(src.LastLocation.Longitude, src.LastLocation.Latitude))))
				.ForMember(dest => dest.AboutMySelf, opt => opt.MapFrom(src => src.AboutMySelf))
				.ForMember(dest => dest.VkId, opt => opt.MapFrom(src => src.VkUserId))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.VkUserAvatarUrl))
				.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
				.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));

			CreateMap<UserThemesRequestModel, YaRyadomUser>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.VkId, opt => opt.Ignore());
			CreateMap<EventFormModel, YaRyadomEvent>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src =>
					!string.IsNullOrWhiteSpace(src.Date)
					? DateTimeOffset.ParseExact(src.Date, "dd.MM.yyyy", CultureInfo.InvariantCulture).ToOffset(-TimeSpan.FromMinutes(src.TimeZoneMinutes))
					: default))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src =>
					!string.IsNullOrWhiteSpace(src.Time)
					? TimeSpan.Parse(src.Time)
					: default))
				.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTimeOffset.Now))
				.ForMember(dest => dest.MaxQuantity, opt => opt.MapFrom(src => src.MaxQuantity))
				.ForMember(dest => dest.Location, opt => opt.MapFrom(src => geometryFactory.CreatePoint(new Coordinate(src.Longitude, src.Latitude))));

			CreateMap<ApplicationRequestModel, YaRyadomUserApplication>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.YaRyadomEventId, opt => opt.MapFrom(src => src.EventId))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => false))
				.ForMember(dest => dest.Status, opt => opt.MapFrom(src => ApplicationStatus.Sent))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => DateTimeOffset.UtcNow.ToOffset(-TimeSpan.FromMinutes(src.TimeZoneMinutes))));

			CreateMap<UserLocationRequestModel, YaRyadomUser>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.VkId, opt => opt.Ignore())
				.ForMember(dest => dest.GeolocationEnabled, opt => opt.MapFrom(src => src.GeolocationEnabled))
				.ForMember(dest => dest.LastLocation, opt => opt.MapFrom(src => geometryFactory.CreatePoint(new Coordinate(src.Longitude, src.Latitude))));

			CreateMap<UserAboutMyselfRequestModel, YaRyadomUser>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.VkId, opt => opt.Ignore())
				.ForMember(dest => dest.AboutMySelf, opt => opt.MapFrom(src => src.AboutMyself));

			CreateMap<UserReviewRequestModel, YaRyadomReview>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTimeOffset.Now.ToOffset(-TimeSpan.FromMinutes(src.TimeZoneMinutes))))
				.ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
				.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
				.ForMember(dest => dest.YaRyadomEventId, opt => opt.MapFrom(src => src.EventId));
		}
	}
}
