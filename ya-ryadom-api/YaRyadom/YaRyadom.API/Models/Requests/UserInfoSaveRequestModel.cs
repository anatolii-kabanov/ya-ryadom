using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Enums;
using YaRyadom.API.Validation;

namespace YaRyadom.API.Models.Requests
{
	public class UserInfoSaveRequestModel : UserInfoUpdateRequestModel
	{
		public bool GuideCompleted { get; set; }

		public bool GeolocationEnabled { get; set; }

		public bool NotificationsEnabled { get; set; }

		[Required]
		[IsValidEnum]
		[ArrayNumbersNotDuplicated]
		public ThemeTypeModel[] SelectedThemes { get; set; }

		[Required]
		[StringLength(84)]
		public string AboutMySelf { get; set; }

		public PositionModel LastLocation { get; set; }
    
	}
}
