using System;
using YaRyadom.Domain.Entities.Base;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomReview : BaseEntity
	{
		public DateTimeOffset CreatedDate { get; set; }

		public string Text { get; set; }

		public int Rating { get; set; }

		public int YaRyadomEventId { get; set; }

		public int YaRyadomUserReviewerId { get; set; }

		public int YaRyadomUserToReviewId { get; set; }

		#region Navigation properties

		public YaRyadomEvent YaRyadomEvent { get; set; }

		public YaRyadomUser YaRyadomUserReviewer { get; set; }

		public YaRyadomUser YaRyadomUserToReview { get; set; }

		#endregion
	}
}
