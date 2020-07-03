using AutoMapper;
using System.Linq;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Enums;
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
				.ForMember(dest => dest.AboutMySelf, opt => opt.MapFrom(src => src.AboutMySelf))
				.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
				.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
				.ForMember(dest => dest.LastLocation, opt => opt.MapFrom(src => new PositionModel() {  Latitude = src.LastLocation.Y, Longitude = src.LastLocation.X }));

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

			CreateMap<YaRyadomReview, UserReviewModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
				.ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
				.ForMember(dest => dest.EventTitle, opt => opt.MapFrom(src => src.YaRyadomEvent.Title))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.YaRyadomUserToReview.FirstName + ' ' + src.YaRyadomUserToReview.LastName));

			CreateMap<YaRyadomReview, UserReviewAboutMeModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
				.ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
				.ForMember(dest => dest.EventTitle, opt => opt.MapFrom(src => src.YaRyadomEvent.Title))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.YaRyadomUserReviewer.FirstName + ' ' + src.YaRyadomUserReviewer.LastName));

			CreateMap<YaRyadomUserApplication, ApplicationModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.VkUserId, opt => opt.MapFrom(src => src.YaRyadomUserRequested.VkId))
				.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.YaRyadomUserRequested.Id))
				.ForMember(dest => dest.SentDate, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.YaRyadomUserRequested.VkUserAvatarUrl))
				.ForMember(dest => dest.Status, opt => opt.MapFrom(src => (ApplicationStatusModel)src.Status))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.YaRyadomUserRequested.FirstName + ' ' + src.YaRyadomUserRequested.LastName));

			CreateMap<YaRyadomUserApplication, MineApplicationModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.VkUserId, opt => opt.MapFrom(src => src.YaRyadomEvent.YaRyadomUserOwner.VkId))
				.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.YaRyadomEvent.YaRyadomUserOwnerId))
				.ForMember(dest => dest.SentDate, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.EventDate, opt => opt.MapFrom(src => $"{src.YaRyadomEvent.Date.Value.ToString()} {src.YaRyadomEvent.Time.Value.ToString()}"))
				.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.YaRyadomEvent.Description))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.YaRyadomEvent.YaRyadomUserOwner.VkUserAvatarUrl))
				.ForMember(dest => dest.Status, opt => opt.MapFrom(src => (ApplicationStatusModel)src.Status))
				.ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.YaRyadomEventId))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => (ThemeTypeModel)src.YaRyadomEvent.YaRyadomEventThemes.Select(m => m.Type).FirstOrDefault()))
				.ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.YaRyadomEvent.Location.Distance(src.YaRyadomUserRequested.LastLocation)))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.YaRyadomEvent.YaRyadomUserOwner.FirstName + ' ' + src.YaRyadomEvent.YaRyadomUserOwner.LastName));
		}
	}
}
