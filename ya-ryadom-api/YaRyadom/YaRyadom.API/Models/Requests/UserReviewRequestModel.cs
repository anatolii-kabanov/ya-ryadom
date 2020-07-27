using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserReviewRequestModel : BaseVkUserRequestModel
	{
		public string Text { get; set; }

		public int Rating { get; set; }

		public int EventId { get; set; }

		public long VkUserToReviewId { get; set; }

		public double TimeZoneMinutes { get; set; }
	}
}
