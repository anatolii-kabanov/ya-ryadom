using YaRyadom.Domain.Entities.Base;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomUserTheme : BaseEntity
	{
		public ThemeType Type { get; set; }

		public int YaRyadomUserId { get; set; }

		#region Navigation properties

		public YaRyadomUser YaRyadomUser { get; set; }

		#endregion
	}
}
