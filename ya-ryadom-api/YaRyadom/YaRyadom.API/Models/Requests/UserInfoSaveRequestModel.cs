using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.Requests
{
	public class UserInfoSaveRequestModel : UserInfoUpdateRequestModel
	{
		public bool GuideCompleted { get; set; }

		public bool GeolocationEnabled { get; set; }

		public bool NotificationsEnabled { get; set; }

		public ThemeTypeModel[] SelectedThemes { get; set; }
		
		public string AboutMySelf { get; set; }

		public PositionModel LastLocation { get; set; }
    
	}
}
