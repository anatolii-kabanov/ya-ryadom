using System;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class YaRyadomEventModel : BaseEventModel
	{

		public int MaxQuantiyty { get; set; }

		public bool Revoked { get; set; }

		public long VkUserOwnerId { get; set; }

		public double Distance { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public string UserFullName { get; set; }

		public ApplicationStatusModel ApplicationStatus { get; set; }

		public ThemeTypeModel ThemeType { get; set; }

		public string Time { get; set; }

		public bool Ended { get; set; }
	}
}
