using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.Requests
{
	public class UserThemesRequestModel : BaseVkUserRequestModel
	{
		public ThemeTypeModel[] SelectedThemes { get; set; }

		public bool NotificationsEnabled { get; set; }
	}
}
