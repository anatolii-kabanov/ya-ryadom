using System.Threading.Tasks;
using YaRyadom.Vk.Models.Notifications;

namespace YaRyadom.Vk
{
	public interface IVkApi
	{
	
		Task<NotificationResponse> SendNotificationAsync(long[] usersIds, string message);
	}
}
