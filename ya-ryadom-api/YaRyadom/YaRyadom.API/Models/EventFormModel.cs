using System;

namespace YaRyadom.API.Models
{
	public class EventFormModel
	{
		/// <summary>
		/// X
		/// </summary>
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		public double Latitude { get; set; }

		public DateTimeOffset Date { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public long VkUserId { get; set; }

		public int UserId { get; set; }

		public int MaxQuantiyty { get; set; }
	}
}
