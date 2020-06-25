using NetTopologySuite.Geometries;
using System;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.ServiceModels
{
	public class YaRyadomEventServiceModel : BaseModel
	{
		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public DateTimeOffset? Date { get; set; }

		public TimeSpan? Time { get; set; }

		public int MaxQuantiyty { get; set; }

		public Point Location { get; set; }

		public bool Revoked { get; set; }

		public long VkUserOwnerId { get; set; }

		/// <summary>
		/// Meters
		/// </summary>
		public double Distance { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public string UserFullName { get; set; }
	}
}
