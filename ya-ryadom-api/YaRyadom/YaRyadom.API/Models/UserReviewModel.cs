using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class UserReviewModel : BaseModel
	{
		public string Text { get; set; }

		public int Rating { get; set; }

		public string EventTitle { get; set; }

		public ThemeTypeModel ThemeType { get; set; }

		public string UserFullName { get; set; }

		public int EventId { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public long VkUserId { get; set; }
	}
}
