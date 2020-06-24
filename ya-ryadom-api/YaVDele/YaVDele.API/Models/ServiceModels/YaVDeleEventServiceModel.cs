using NetTopologySuite.Geometries;
using System;
using YaVDele.API.Models.Base;

namespace YaVDele.API.Models.ServiceModels
{
	public class YaVDeleEventServiceModel : BaseModel
	{
		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset Date { get; set; }

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
