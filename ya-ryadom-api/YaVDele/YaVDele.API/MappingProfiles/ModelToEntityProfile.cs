using AutoMapper;
using NetTopologySuite.Geometries;
using YaVDele.API.Models;
using YaVDele.Domain.Entities;

namespace YaVDele.API.MappingProfiles
{
	public class ModelToEntityProfile : Profile
	{
		public ModelToEntityProfile(GeometryFactory geometryFactory)
		{
			CreateMap<UserInfoModel, YaVDeleUser>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.GuideCompleted, opt => opt.MapFrom(src => src.GuideCompleted))
				.ForMember(dest => dest.VkId, opt => opt.MapFrom(src => src.VkUserId))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.VkUserAvatarUrl))
				.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
				.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));
			CreateMap<EventFormModel, YaVDeleEvent>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.MaxQuantiyty, opt => opt.MapFrom(src => src.MaxQuantiyty))
				.ForMember(dest => dest.Location, opt => opt.MapFrom(src => geometryFactory.CreatePoint(new Coordinate(src.Longitude, src.Latitude))));
		}
	}
}
