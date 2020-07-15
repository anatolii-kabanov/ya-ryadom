using System;

namespace YaRyadom.API.Models.Base
{
	public class BaseEventModel : BaseModel
	{
		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public DateTimeOffset? Date { get; set; }

		/// <summary>
		/// X
		/// </summary>
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		public double Latitude { get; set; }
	}
}
