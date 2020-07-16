using YaRyadom.API.Models.Base;

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
	}
}
