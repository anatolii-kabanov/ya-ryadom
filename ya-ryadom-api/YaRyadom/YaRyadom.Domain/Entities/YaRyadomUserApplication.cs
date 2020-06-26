using System;
using YaRyadom.Domain.Entities.Base;
using YaRyadom.Domain.Entities.Enums;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomUserApplication : BaseEntity
	{
		public DateTimeOffset Date { get; set; }

		public ApplicationStatus Status { get; set; }

		public bool Revoked { get; set; }

		public int YaRyadomEventId { get; set; }

		public int YaRyadomUserRequestedId { get; set; }

		#region Navigation properties

		public YaRyadomEvent YaRyadomEvent { get; set; }

		public YaRyadomUser YaRyadomUserRequested { get; set; }

		#endregion
	}
}
