using Newtonsoft.Json;

namespace YaRyadom.Vk.Models.Errors
{
	public class Error
	{
		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("error_code")]
		public int ErrorCode { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("error_msg")]
		public string ErrorMessage { get; set; }
	}
}
