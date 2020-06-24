namespace YaVDele.API.Models.Requests
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

		public double MaxDistance { get; set; }

		public string SearchText { get; set; }
	}
}
