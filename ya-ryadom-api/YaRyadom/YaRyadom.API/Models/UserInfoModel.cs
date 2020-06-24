using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class UserInfoModel : BaseModel
	{
		public long VkUserId { get; set; }

		public bool GuideCompleted { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public string AboutMySelf { get; set; }

		public ThemeTypeModel[] SelectedThemes { get; set; }
	}
}
