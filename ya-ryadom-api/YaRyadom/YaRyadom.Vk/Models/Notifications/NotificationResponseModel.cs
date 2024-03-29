﻿using Newtonsoft.Json;

namespace YaRyadom.Vk.Models.Notifications
{
	public class NotificationResponseModel
	{
		[JsonProperty("status")]
		public bool Status { get; set; }

		[JsonProperty("user_id")]
		public long UserId { get; set; }
	}
}
