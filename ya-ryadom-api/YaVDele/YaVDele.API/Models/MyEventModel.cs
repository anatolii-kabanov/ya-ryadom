using System;
using YaVDele.API.Models.Base;

namespace YaVDele.API.Models
{
	public class MyEventModel : BaseModel
	{
		/// <summary>
		/// Meters
		/// </summary>
		public double Distance { get; set; }

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
	}
}
