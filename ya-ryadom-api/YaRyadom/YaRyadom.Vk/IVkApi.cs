using System.Threading.Tasks;
using YaRyadom.Vk.Models;
using YaRyadom.Vk.Models.Notifications;
using YaRyadom.Vk.Models.Users;

namespace YaRyadom.Vk
{
	public interface IVkApi
	{
	
		Task<NotificationResponse> SendNotificationAsync(long[] usersIds, string message);

		/// <summary>
		/// 
		/// </summary>
		/// <param name="userIdsOrScreenNames"></param>
		/// <returns></returns>
		Task<UserInfoResponse> GetUserInfoAsync(string[] userIdsOrScreenNames);

		Task<BaseResponse> IsNotificationsAllowedAsync(long usersId);
	}
}
