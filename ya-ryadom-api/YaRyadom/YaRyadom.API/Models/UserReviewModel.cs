using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models
{
	public class UserReviewModel : BaseModel
	{
		public string Text { get; set; }

		public int Rating { get; set; }

		public string EventTitle { get; set; }

		public string UserFullName { get; set; }
	}
}
