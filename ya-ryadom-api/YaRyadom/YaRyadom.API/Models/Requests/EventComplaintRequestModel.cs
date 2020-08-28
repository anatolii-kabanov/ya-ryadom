using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.Requests
{
	public class EventComplaintRequestModel : BaseVkUserRequestModel
	{
		[Required]
		public ComplaintTypeModel ComplaintType { get; set; }

		[Required]
		[StringLength(255)]
		public string Text { get; set; }

		public int EventId { get; set; }
	}
}
