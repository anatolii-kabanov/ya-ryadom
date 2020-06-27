using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YaRyadom.API.Models.Requests
{
	public class ApplicationRequestModel
	{
		public int EventId { get; set; }

		public long VkUserId { get; set; }

		public int UserId { get; set; }

		public double TimeZoneMinutes { get; set; }
	}
}
