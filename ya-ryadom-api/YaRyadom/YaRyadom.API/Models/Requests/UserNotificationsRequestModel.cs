using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserNotificationsRequestModel : BaseVkUserRequestModel
	{
		public bool NotificationsEnabled { get; set; }
	}
}
