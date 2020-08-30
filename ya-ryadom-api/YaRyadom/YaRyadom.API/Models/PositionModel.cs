using System.ComponentModel.DataAnnotations;

namespace YaRyadom.API.Models
{
	public class PositionModel
	{
		/// <summary>
		/// X
		/// </summary>
		[Range(-180.0, 180.0)]
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		[Range(-90.0, 90.0)]
		public double Latitude { get; set; }
	}
}
