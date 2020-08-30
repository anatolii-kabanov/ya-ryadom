using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserLocationRequestModel : BaseVkUserRequestModel
	{
		public bool GeolocationEnabled { get; set; }

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
