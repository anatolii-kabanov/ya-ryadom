using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Vk.Models;
using YaRyadom.Vk.Models.Notifications;
using YaRyadom.Vk.Models.Users;

namespace YaRyadom.Vk
{
	public interface IVkApi
	{

		Task<NotificationResponse> SendNotificationAsync(long[] usersIds, string message, CancellationToken cancellationToken = default);

		/// <summary>
		/// 
		/// </summary>
		/// <param name="userIdsOrScreenNames"></param>
		/// <returns></returns>
		Task<UserInfoResponse> GetUserInfoAsync(string[] userIdsOrScreenNames, CancellationToken cancellationToken = default);

		Task<NotificationAllowanceResponse> IsNotificationsAllowedAsync(long userId, CancellationToken cancellationToken = default);
	}
}
