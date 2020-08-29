using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.Requests
{
	public class EventsRequestModel : BaseVkUserRequestModel
	{
		public int UserId { get; set; }

		/// <summary>
		/// X
		/// </summary>
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		public double Latitude { get; set; }

		/// <summary>
		/// Km
		/// </summary>
		[Range(1.0, 100.0)]
		public double MaxDistance { get; set; }

		[StringLength(84)]
		public string SearchText { get; set; }

		public ThemeTypeModel? Theme { get; set; }
	}
}
