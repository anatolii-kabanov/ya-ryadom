using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class EventRequestModel : BaseVkUserRequestModel
	{
		[Range(1, int.MaxValue, ErrorMessage = "The value should be greater or equal {1}.")]
		public int EventId { get; set; }

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
