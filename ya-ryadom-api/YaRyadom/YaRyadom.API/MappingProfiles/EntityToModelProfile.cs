using AutoMapper;
using YaRyadom.API.Models;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.MappingProfiles
{
	public class EntityToModelProfile : Profile
	{
		public EntityToModelProfile()
		{
			CreateMap<YaRyadomUser, UserInfoModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.VkUserId, opt => opt.MapFrom(src => src.VkId))
				.ForMember(dest => dest.GuideCompleted, opt => opt.MapFrom(src => src.GuideCompleted))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.VkUserAvatarUrl))
				.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
				.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));
			CreateMap<YaRyadomEventServiceModel, YaRyadomEventModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.MaxQuantiyty, opt => opt.MapFrom(src => src.MaxQuantiyty))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.VkUserAvatarUrl))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.UserFullName))
				.ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
				.ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Location.Y))
				.ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Location.X));
			CreateMap<MyEventServiceModel, MyEventModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
				.ForMember(dest => dest.MaxQuantiyty, opt => opt.MapFrom(src => src.MaxQuantiyty))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Location.Y))
				.ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Location.X));
		}
	}
}
