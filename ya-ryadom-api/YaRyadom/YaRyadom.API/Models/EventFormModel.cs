using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class EventFormModel : BaseVkUserRequestModel
	{
		/// <summary>
		/// X
		/// </summary>
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		public double Latitude { get; set; }

		public string Date { get; set; }

		public string Time { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public int UserId { get; set; }

		public int MaxQuantity { get; set; }

		public double TimeZoneMinutes { get; set; }

		public ThemeTypeModel[] SelectedThemes { get; set; }
	}
}
