using NetTopologySuite.Geometries;
using System;
using YaVDele.API.Models.Base;

namespace YaVDele.API.Models.ServiceModels
{
	public class MyEventServiceModel : BaseModel
	{
		/// <summary>
		/// Meters
		/// </summary>
		public double Distance { get; set; }

		public Point Location { get; set; }

		public DateTimeOffset Date { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public int MaxQuantiyty { get; set; }

		public bool Revoked { get; set; }
	}
}
