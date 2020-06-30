namespace YaRyadom.API.Models.Requests
{
	public class UserLocationRequestModel
	{
		public long VkUserId { get; set; }

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
