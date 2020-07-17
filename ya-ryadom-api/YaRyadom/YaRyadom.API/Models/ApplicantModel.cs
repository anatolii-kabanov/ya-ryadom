using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models
{
	public class ApplicantModel
	{
		public int ApplicationId { get; set; }

		public long VkUserId { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public ApplicationStatusModel ApplicationStatus { get; set; }
	}
}
