using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models
{
	public class UserInfoModel : BaseUserInfoModel
	{
		public bool GuideCompleted { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }
	}
}
