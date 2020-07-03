namespace YaRyadom.API.Models.Requests
{
	public class UserInfoSaveRequestModel
	{
		public long VkUserId { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }
	}
}
