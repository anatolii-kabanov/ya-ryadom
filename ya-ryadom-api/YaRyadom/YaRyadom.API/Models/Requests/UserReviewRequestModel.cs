using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserReviewRequestModel : BaseModel
	{
		public long VkOwnerUserId { get; set; }

		public string Text { get; set; }

		public int Rating { get; set; }

		public int EventId { get; set; }

		public long VkUserId { get; set; }

		public double TimeZoneMinutes { get; set; }
	}
}
