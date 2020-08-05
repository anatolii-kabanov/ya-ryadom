using System.ComponentModel;

namespace YaRyadom.Vk.Enums
{
	public enum VkApiMethod
	{
		/// <summary>
		/// Send notifications to specific users
		/// </summary>
		[Description("secure.sendNotification")]
		SendNotification,

		/// <summary>
		/// Check notifications is available for user by id
		/// </summary>
		[Description("apps.isNotificationsAllowed")]
		IsNotificationsAllowed,

		/// <summary>
		/// Get users with specific fields
		/// </summary>
		[Description("users.get")]
		UsersGet,
	}
}
