using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Validation;

namespace YaRyadom.API.Models.Requests
{
	public class UserReviewRequestModel : BaseVkUserRequestModel
	{
		[StringLength(84)]
		[Required]
		public string Text { get; set; }

		[Range(1, 5)]
		public int Rating { get; set; }

		[Range(1, int.MaxValue, ErrorMessage = "The value should be greater or equal {1}.")]
		public int EventId { get; set; }

		[NotEqualVkId]
		public long VkUserToReviewId { get; set; }

		public double TimeZoneMinutes { get; set; }
	}
}
