using YaRyadom.Domain.Entities.Base;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomEventTheme : BaseEntity
	{
		public ThemeType Type { get; set; }

		public int YaRyadomEventId { get; set; }

		#region Navigation properties

		public YaRyadomEvent YaRyadomEvent { get; set; }

		#endregion
	}
}
