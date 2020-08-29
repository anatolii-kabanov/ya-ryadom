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
		public double MaxDistance { get; set; }

		public string SearchText { get; set; }

		public ThemeTypeModel? Theme { get; set; }
	}
}
