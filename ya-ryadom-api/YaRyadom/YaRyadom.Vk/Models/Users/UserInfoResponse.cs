using Newtonsoft.Json;

namespace YaRyadom.Vk.Models.Users
{
	public class UserInfoResponse : BaseResponse
	{
		/// <summary>
		/// 
		/// </summary>
		[JsonProperty("response")]
		public UserInfo[] UserInfos { get; set; }
	}
}
