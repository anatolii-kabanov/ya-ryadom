using AutoMapper;
using System;
using System.Linq;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Enums;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.API.MappingProfiles
{
	public class EntityToModelProfile : Profile
	{
		public EntityToModelProfile()
		{
			CreateMap<YaRyadomUser, UserInfoModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.VkUserId, opt => opt.MapFrom(src => src.VkId))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.VkUserAvatarUrl))
				.ForMember(dest => dest.AboutMySelf, opt => opt.MapFrom(src => src.AboutMySelf))
				.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
				.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
				.ForMember(dest => dest.AvgRating, opt => opt.MapFrom(src => src.YaRyadomReviewsAboutMe.Average(m => m.Rating)))
				.ForMember(dest => dest.SelectedThemes, opt => opt.MapFrom(src => src.YaRyadomUserThemes.Select(m => (ThemeTypeModel)m.Type)));

			CreateMap<YaRyadomUser, MyProfileModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.VkUserId, opt => opt.MapFrom(src => src.VkId))
				.ForMember(dest => dest.GuideCompleted, opt => opt.MapFrom(src => src.GuideCompleted))
				.ForMember(dest => dest.AboutMySelf, opt => opt.MapFrom(src => src.AboutMySelf))
				.ForMember(dest => dest.NotificationsEnabled, opt => opt.MapFrom(src => src.NotificationsEnabled))
				.ForMember(dest => dest.GeolocationEnabled, opt => opt.MapFrom(src => src.GeolocationEnabled))
				.ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
				.ForMember(dest => dest.AvgRating, opt => opt.MapFrom(src => src.YaRyadomReviewsAboutMe.Average(m => m.Rating)))
				.ForMember(dest => dest.SelectedThemes, opt => opt.MapFrom(src => src.YaRyadomUserThemes.Select(m => (ThemeTypeModel)m.Type)))
				.ForMember(dest => dest.LastLocation, opt => opt.MapFrom(src => new PositionModel() { Latitude = src.LastLocation.Y, Longitude = src.LastLocation.X }));

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
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.ThemeType))
				.ForMember(dest => dest.Ended, opt => opt.MapFrom(src => src.Ended))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time != null ? src.Time.Value.ToString(@"hh\:mm") : string.Empty))
				.ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Location.Y))
				.ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Location.X));

			CreateMap<YaRyadomEvent, MyEventServiceModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.Ended, opt => opt.MapFrom(src => src.Ended))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time))
				.ForMember(dest => dest.MaxQuantity, opt => opt.MapFrom(src => src.MaxQuantity))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.YaRyadomEventThemes.Select(m => (ThemeTypeModel)m.Type).FirstOrDefault()))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
				.ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.YaRyadomUserApplications.Where(m => m.Status == ApplicationStatus.Confirmed)));

			CreateMap<YaRyadomEvent, MyEventWithApplicationsServiceModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.Ended, opt => opt.MapFrom(src => src.Ended))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time))
				.ForMember(dest => dest.MaxQuantity, opt => opt.MapFrom(src => src.MaxQuantity))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.YaRyadomEventThemes.Select(m => (ThemeTypeModel)m.Type).FirstOrDefault()))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
				.ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.YaRyadomUserApplications.Where(m => m.Status != ApplicationStatus.None)));

			CreateMap<YaRyadomEvent, UserEventServiceModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.Ended, opt => opt.MapFrom(src => src.Ended))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time))
				.ForMember(dest => dest.MaxQuantity, opt => opt.MapFrom(src => src.MaxQuantity))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.YaRyadomEventThemes.Select(m => (ThemeTypeModel)m.Type).FirstOrDefault()))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
				.ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.YaRyadomUserApplications));

			CreateMap<UserEventServiceModel, UserEventModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time != null ? src.Time.Value.ToString(@"hh\:mm") : string.Empty))
				.ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
				.ForMember(dest => dest.Ended, opt => opt.MapFrom(src => src.Ended))
				.ForMember(dest => dest.MaxQuantity, opt => opt.MapFrom(src => src.MaxQuantity))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.Participants))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.ThemeType))
				.ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Location.Y))
				.ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Location.X));

			CreateMap<YaRyadomUserApplication, ApplicantModel>()
				.ForMember(dest => dest.ApplicationId, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.ApplicationStatus, opt => opt.MapFrom(src => (ApplicationStatusModel)src.Status))
				.ForMember(dest => dest.VkUserId, opt => opt.MapFrom(src => src.YaRyadomUserRequested.VkId))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.YaRyadomUserRequested.VkUserAvatarUrl));

			CreateMap<MyEventServiceModel, MyEventModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
				.ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time != null ? src.Time.Value.ToString(@"hh\:mm") : string.Empty))
				.ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
				.ForMember(dest => dest.MaxQuantity, opt => opt.MapFrom(src => src.MaxQuantity))
				.ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
				.ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.Participants))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.ThemeType))
				.ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Location.Y))
				.ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Location.X));

			CreateMap<YaRyadomReview, UserReviewModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
				.ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
				.ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.YaRyadomEventId))
				.ForMember(dest => dest.EventTitle, opt => opt.MapFrom(src => src.YaRyadomEvent.Title))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.YaRyadomEvent.YaRyadomEventThemes.Select(m => (ThemeTypeModel)m.Type).FirstOrDefault()))
				.ForMember(dest => dest.EventTitle, opt => opt.MapFrom(src => src.YaRyadomEvent.Title))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.YaRyadomUserToReview.FirstName + ' ' + src.YaRyadomUserToReview.LastName))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.YaRyadomUserToReview.VkUserAvatarUrl)); 

			CreateMap<YaRyadomReview, UserReviewAboutMeModel>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
				.ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
				.ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.YaRyadomEventId))
				.ForMember(dest => dest.EventTitle, opt => opt.MapFrom(src => src.YaRyadomEvent.Title))
				.ForMember(dest => dest.ThemeType, opt => opt.MapFrom(src => src.YaRyadomEvent.YaRyadomEventThemes.Select(m => (ThemeTypeModel)m.Type).FirstOrDefault()))
				.ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.YaRyadomUserReviewer.FirstName + ' ' + src.YaRyadomUserReviewer.LastName))
				.ForMember(dest => dest.VkUserAvatarUrl, opt => opt.MapFrom(src => src.YaRyadomUserReviewer.VkUserAvatarUrl));

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
				.ForMember(dest => dest.EventDate, opt => opt.MapFrom(src => src.YaRyadomEvent.Date))
				.ForMember(dest => dest.EventTime, opt => opt.MapFrom(src => src.YaRyadomEvent.Time != null ? src.YaRyadomEvent.Time.Value.ToString(@"hh\:mm") : string.Empty))
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
