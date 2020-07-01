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

		public DateTimeOffset Date { get; set; }

		public ApplicationStatusModel Status { get; set; }
	}
}
