using System;
using YaVDele.API.Models.Base;

namespace YaVDele.API.Models
{
	public class YaVDeleEventModel : BaseModel
	{
		/// <summary>
		/// X
		/// </summary>
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		public double Latitude { get; set; }

		public DateTimeOffset Date { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public int MaxQuantiyty { get; set; }

		public bool Revoked { get; set; }

		public long VkUserOwnerId { get; set; }

		public double Distance { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public string UserFullName { get; set; }
	}
}
