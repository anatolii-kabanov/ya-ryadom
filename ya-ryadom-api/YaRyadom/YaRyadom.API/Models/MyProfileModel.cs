using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models
{
	public class MyProfileModel : BaseUserInfoModel
	{
		public bool GuideCompleted { get; set; }

		public bool NotificationsEnabled { get; set; }

		public PositionModel LastLocation { get; set; }

		public string Address { get; set; }

		public string AboutMySelf { get; set; }

		public double AvgRating { get; set; }
	}
}
