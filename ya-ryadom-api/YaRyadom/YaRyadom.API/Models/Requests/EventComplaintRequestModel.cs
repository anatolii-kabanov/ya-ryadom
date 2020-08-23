﻿using YaRyadom.API.Models.Base;
using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.Requests
{
	public class EventComplaintRequestModel : BaseVkUserRequestModel
	{
		public ComplaintTypeModel ComplaintType { get; set; }

		public string Text { get; set; }

		public int EventId { get; set; }
	}
}