using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserInfoUpdateRequestModel : BaseVkUserRequestModel
	{
		[StringLength(255)]
		public string FirstName { get; set; }

		[StringLength(255)]
		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }
	}
}
