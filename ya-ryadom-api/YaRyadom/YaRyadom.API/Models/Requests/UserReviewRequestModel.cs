using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserReviewRequestModel : BaseVkUserRequestModel
	{
		[StringLength(84)]
		[Required]
		public string Text { get; set; }

		[Range(1, 5)]
		public int Rating { get; set; }

		public int EventId { get; set; }

		public long VkUserToReviewId { get; set; }

		public double TimeZoneMinutes { get; set; }
	}
}
