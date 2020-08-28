using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserAboutMyselfRequestModel : BaseVkUserRequestModel
	{
		[Required]
		[StringLength(84)]
		public string AboutMyself { get; set; }
	}
}
