using Newtonsoft.Json;

namespace YaRyadom.Vk.Models.Users
{
	public class UserInfo
	{
		/// <summary>
		/// ID
		/// </summary>
		[JsonProperty("id")]
		public long Id { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("first_name")]
		public string FirstName { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("last_name")]
		public string LastName { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("screen_name")]
		public string ScreenName { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("photo_50")]
		public string Photo50Url { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("photo_200")]
		public string Photo200Url { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("deactivated")]
		public string Deactivated { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("verified")]
		public bool Verified { get; set; }
	}
}
