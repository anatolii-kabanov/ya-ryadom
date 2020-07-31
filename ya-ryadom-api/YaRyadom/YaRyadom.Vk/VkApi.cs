using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using YaRyadom.Vk.Enums;
using YaRyadom.Vk.Extensions;
using YaRyadom.Vk.Models.Notifications;

namespace YaRyadom.Vk
{
	public class VkApi : IVkApi
	{
		private readonly string _accessToken;
		private readonly HttpClient _httpClient;

		/// <summary>
		/// VK API version
		/// </summary>
		private const string ApiVersion = "5.80";

		/// <summary>
		/// API Url
		/// </summary>
		private readonly string _apiUrl = "https://api.vk.com/method/";

		public VkApi(string accessToken, HttpClient httpClient)
		{
			if (string.IsNullOrWhiteSpace(accessToken)) throw new ArgumentNullException(nameof(accessToken));
			_accessToken = accessToken;
			_httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
		}

		public async Task<NotificationResponse> SendNotificationAsync(long[] usersIds, string message)
		{
			var queryString = HttpUtility.ParseQueryString($"{_apiUrl}{VkApiMethod.SendNotification.GetDescription()}");
			var users = string.Join(",", usersIds);
			queryString["user_ids"] = users;
			queryString["message"] = message;
			queryString["v"] = ApiVersion;
			queryString["access_token"] = _accessToken;
			var result = await _httpClient.PostAsync(queryString.ToString(), null).ConfigureAwait(false);

			throw new NotImplementedException();
		}
	}
}
