using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserInfoUpdateRequestModel : BaseVkUserRequestModel
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }
	}
}
