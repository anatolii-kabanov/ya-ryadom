using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class ApplicationActionRequestModel : BaseVkUserRequestModel
	{
		[Range(1, int.MaxValue, ErrorMessage = "The value should be greater or equal {1}.")]
		public int ApplicationId { get; set; }
	}
}
