using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;
using YaRyadom.API.Validation;

namespace YaRyadom.API.Models.Requests
{
	public class UserThemesRequestModel : BaseVkUserRequestModel
	{
		[Required]
		[IsValidEnum]
		[ArrayNumbersNotDuplicated]
		public ThemeTypeModel[] SelectedThemes { get; set; }

		public bool NotificationsEnabled { get; set; }
	}
}
