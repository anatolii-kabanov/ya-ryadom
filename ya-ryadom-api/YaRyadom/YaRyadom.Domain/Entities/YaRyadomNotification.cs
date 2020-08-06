using System;
using YaRyadom.Domain.Entities.Base;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomNotification : BaseEntity
	{
		public DateTimeOffset CreatedDate { get; set; }

		public bool IsSent { get; set; }

		public DateTimeOffset? SentDate { get; set; }

		public NotificationType NotificationType { get; set; }

		public string Message { get; set; }

		public int? YaRyadomEventId { get; set; }

		public int YaRyadomUserToSendId { get; set; }

		#region Navigation properties

		public virtual YaRyadomEvent YaRyadomEvent { get; set; }

		public virtual YaRyadomUser YaRyadomUserToSend { get; set; }

		#endregion
	}
}
