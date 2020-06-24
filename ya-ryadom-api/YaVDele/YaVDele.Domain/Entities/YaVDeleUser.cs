using System.Collections.Generic;
using YaVDele.Domain.Entities.Base;

namespace YaVDele.Domain.Entities
{
	public class YaVDeleUser : BaseEntity
	{
		#region Navigation fields

		private ICollection<YaVDeleEvent> _ownYaVDeleEvents;

		#endregion

		public long VkId { get; set; }

		public bool GuideCompleted { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string VkUserAvatarUrl { get; set; }

		#region Navigation properties

		public ICollection<YaVDeleEvent> OwnYaVDeleEvents
		{
			get => _ownYaVDeleEvents ?? new List<YaVDeleEvent>();
			set => _ownYaVDeleEvents = value;
		}

		#endregion
	}
}
