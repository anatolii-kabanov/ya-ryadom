using Newtonsoft.Json;
using YaRyadom.Vk.Models.Errors;

namespace YaRyadom.Vk.Models
{
	public class BaseResponse<TResponse>
	{
		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("response")]
		public TResponse Response { get; set; }

		/// <summary>
		/// Http status code
		/// </summary>
		public int StatusCode { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("error")]
		public Error Error { get; set; }
	}
}
