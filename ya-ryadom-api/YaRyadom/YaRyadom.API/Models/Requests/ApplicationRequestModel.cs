using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class ApplicationRequestModel : BaseVkUserRequestModel
	{
		public int EventId { get; set; }

		public int UserId { get; set; }

		public double TimeZoneMinutes { get; set; }
	}
}
