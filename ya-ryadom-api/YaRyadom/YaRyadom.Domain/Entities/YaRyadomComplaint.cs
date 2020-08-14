using YaRyadom.Domain.Entities.Base;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomComplaint : BaseEntity
	{

		public string Text { get; set; }

		public ComplaintType ComplaintType { get; set; }

		public int YaRyadomEventId { get; set; }

		public int YaRyadomFromUserId { get; set; }

		#region Navigation properties

		public virtual YaRyadomEvent YaRyadomEvent { get; set; }

		public virtual YaRyadomUser YaRyadomFromUser { get; set; }

		#endregion
	}
}
