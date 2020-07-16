using System;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class ApplicationModel : BaseModel
	{
		public int UserId { get; set; }

		public long VkUserId { get; set; }

		public string UserFullName { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public DateTimeOffset SentDate { get; set; }

		public DateTimeOffset? EventDate { get; set; }

		public string EventTime{ get; set; }

		public ApplicationStatusModel Status { get; set; }

		public string Text { get; set; }

		public int EventId { get; set; }

		/// <summary>
		/// Meters
		/// </summary>
		public double Distance { get; set; }

		public ThemeTypeModel ThemeType { get; set; }
	}
}
