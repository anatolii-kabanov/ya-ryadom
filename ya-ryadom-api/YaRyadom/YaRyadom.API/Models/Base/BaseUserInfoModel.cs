using YaRyadom.API.Models.Enums;

namespace YaRyadom.API.Models.Base
{
	public class BaseUserInfoModel : BaseModel
	{
		public long VkUserId { get; set; }

		public string AboutMySelf { get; set; }

		public ThemeTypeModel[] SelectedThemes { get; set; }
	}
}
