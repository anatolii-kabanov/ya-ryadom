namespace YaRyadom.API.Models.Requests
{
	public class EventsRequestModel
	{
		public int UserId { get; set; }

		public long VkUserId { get; set; }

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
	}
}
