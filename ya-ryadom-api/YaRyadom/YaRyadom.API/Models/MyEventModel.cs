using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class MyEventModel : BaseEventModel
	{
		/// <summary>
		/// Meters
		/// </summary>
		public double Distance { get; set; }

		public int MaxQuantiyty { get; set; }

		public bool Revoked { get; set; }

		public string Time { get; set; }

		public ApplicantModel[] Participants { get; set; }

		public bool Ended { get; set; }

		public ThemeTypeModel ThemeType { get; set; }
	}
}
