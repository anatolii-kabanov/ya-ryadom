using System.ComponentModel.DataAnnotations;
using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;
using YaRyadom.API.Validation;

namespace YaRyadom.API.Models.Requests
{
	public class EventsRequestModel : BaseVkUserRequestModel
	{
		public int UserId { get; set; }

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

		/// <summary>
		/// Km
		/// </summary>
		[Range(1.0, 100.0)]
		public double MaxDistance { get; set; }

		[StringLength(84)]
		public string SearchText { get; set; }

		[IsValidEnum]
		public ThemeTypeModel? Theme { get; set; }
	}
}
