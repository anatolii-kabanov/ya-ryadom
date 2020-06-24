using YaVDele.API.Models.Base;

namespace YaVDele.API.Models
{
	public class UserInfoModel : BaseModel
	{
		public long VkUserId { get; set; }

		public bool GuideCompleted { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }
	}
}
