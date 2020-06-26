using NetTopologySuite.Geometries;
using System.Collections.Generic;
using YaRyadom.Domain.Entities.Base;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomUser : BaseEntity
	{
		#region Navigation fields

		private ICollection<YaRyadomEvent> _ownYaVDeleEvents;

		private ICollection<YaRyadomUserTheme> _yaRyadomUserThemes;

		private ICollection<YaRyadomUserApplication> _yaRyadomUserApplications;

		#endregion

		public long VkId { get; set; }

		public bool GuideCompleted { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string AboutMySelf { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public Point LastLocation { get; set; }

		#region Navigation properties

		public ICollection<YaRyadomEvent> OwnYaVDeleEvents
		{
			get => _ownYaVDeleEvents ?? new List<YaRyadomEvent>();
			set => _ownYaVDeleEvents = value;
		}

		public ICollection<YaRyadomUserTheme> YaRyadomUserThemes
		{
			get => _yaRyadomUserThemes ?? new List<YaRyadomUserTheme>();
			set => _yaRyadomUserThemes = value;
		}
		
		public ICollection<YaRyadomUserApplication> YaRyadomUserApplications
		{
			get => _yaRyadomUserApplications ?? new List<YaRyadomUserApplication>();
			set => _yaRyadomUserApplications = value;
		}
		
		#endregion
	}
}
