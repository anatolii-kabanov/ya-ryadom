namespace YaRyadom.API.Models.Requests
{
	public class UserNotificationsRequestModel
	{
		public long VkUserId { get; set; }

		public bool NotificationsEnabled { get; set; }
	}
}
