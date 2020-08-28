using System.ComponentModel.DataAnnotations;
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

		[Required]
		public string Date { get; set; }

		[Required]
		public string Time { get; set; }

		[StringLength(20)]
		[Required]
		public string Title { get; set; }

		[StringLength(84)]
		[Required]
		public string Description { get; set; }

		public int UserId { get; set; }

		public int MaxQuantity { get; set; }

		public double TimeZoneMinutes { get; set; }

		[Required]
		public ThemeTypeModel[] SelectedThemes { get; set; }
	}
}
