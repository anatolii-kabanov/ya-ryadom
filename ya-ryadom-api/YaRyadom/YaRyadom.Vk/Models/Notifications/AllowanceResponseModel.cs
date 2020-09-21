using Newtonsoft.Json;

namespace YaRyadom.Vk.Models.Notifications
{
	public class AllowanceResponseModel
	{
		[JsonProperty("is_allowed")]
		public bool IsAllowed { get; set; }
	}
}
