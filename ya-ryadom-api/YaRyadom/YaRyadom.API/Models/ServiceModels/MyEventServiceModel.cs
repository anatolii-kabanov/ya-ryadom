using NetTopologySuite.Geometries;
using System;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.ServiceModels
{
	public class MyEventServiceModel : BaseModel
	{
		/// <summary>
		/// Meters
		/// </summary>
		public double Distance { get; set; }

		public Point Location { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public DateTimeOffset? Date { get; set; }

		public TimeSpan? Time { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public int MaxQuantity { get; set; }

		public bool Revoked { get; set; }

		public ApplicantModel[] Participants { get; set; }

		public bool Ended { get; set; }

		public ThemeTypeModel ThemeType { get; set; }
	}
}
