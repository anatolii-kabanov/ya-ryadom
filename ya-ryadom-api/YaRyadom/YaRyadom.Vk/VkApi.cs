using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using YaRyadom.Vk.Enums;
using YaRyadom.Vk.Extensions;
using YaRyadom.Vk.Models;
using YaRyadom.Vk.Models.Notifications;
using YaRyadom.Vk.Models.Users;

namespace YaRyadom.Vk
{
	public class VkApi : IVkApi
	{
		private readonly string _accessToken;
		private readonly HttpClient _httpClient;

		/// <summary>
		/// VK API version
		/// </summary>
		private const string ApiVersion = "5.95";

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

		public async Task<NotificationResponse> SendNotificationAsync(long[] usersIds, string message, CancellationToken cancellationToken)
		{
			if (string.IsNullOrEmpty(message)) throw new ArgumentNullException(nameof(message));
			if (message.Length > 254) throw new ArgumentOutOfRangeException(nameof(message));

			var queryString = HttpUtility.ParseQueryString(string.Empty);
			var users = string.Join(",", usersIds);
			queryString["user_ids"] = users;
			queryString["message"] = message;
			queryString["v"] = ApiVersion;
			queryString["access_token"] = _accessToken;
			var postValues = new FormUrlEncodedContent(queryString.AllKeys.ToDictionary(k => k, k => queryString[k]));
			var response = await _httpClient
				.PostAsync($"{_apiUrl}{VkApiMethod.NotificationsSendMessage.GetDescription()}?{queryString}", postValues, cancellationToken)
				.ConfigureAwait(false);
			var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
			var notificationResponse = JsonConvert.DeserializeObject<NotificationResponse>(json);
			return notificationResponse;
		}

		public async Task<UserInfoResponse> GetUserInfoAsync(string[] userIdsOrScreenNames, VkLanguage vkLanguage, CancellationToken cancellationToken)
		{
			var queryString = HttpUtility.ParseQueryString(string.Empty);
			var users = string.Join(",", userIdsOrScreenNames);

			queryString["user_ids"] = users;
			queryString["fields"] = "photo_50, photo_200, city";
			queryString["v"] = ApiVersion;
			queryString["access_token"] = _accessToken;
			queryString["lang"] = vkLanguage.ToString();

			var response = await _httpClient.GetAsync($"{_apiUrl}{VkApiMethod.UsersGet.GetDescription()}?{queryString}", cancellationToken).ConfigureAwait(false);
			var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
			var userInfoResponse = JsonConvert.DeserializeObject<UserInfoResponse>(json);
			return userInfoResponse;
		}

		public async Task<NotificationAllowanceResponse> IsNotificationsAllowedAsync(long usersId, CancellationToken cancellationToken)
		{
			var queryString = HttpUtility.ParseQueryString(string.Empty);
			queryString["user_id"] = usersId.ToString();
			queryString["v"] = ApiVersion;
			queryString["access_token"] = _accessToken;
			var response = await _httpClient
				.GetAsync($"{_apiUrl}{VkApiMethod.IsNotificationsAllowed.GetDescription()}?{queryString}", cancellationToken)
				.ConfigureAwait(false);
			var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
			var notificationAllowanceResponse = JsonConvert.DeserializeObject<NotificationAllowanceResponse>(json);
			return notificationAllowanceResponse;
		}


	}
}
