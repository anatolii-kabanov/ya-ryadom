using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using YaRyadom.Domain.Entities.Base;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomUser : BaseEntity
	{
		#region Navigation fields

		private ICollection<YaRyadomEvent> _ownYaRyadomEvents;

		private ICollection<YaRyadomUserTheme> _yaRyadomUserThemes;

		private ICollection<YaRyadomUserApplication> _yaRyadomUserApplications;

		private ICollection<YaRyadomReview> _yaRyadomReviewsMine;

		private ICollection<YaRyadomReview> _yaRyadomMyReviewsAboutMe;

		private ICollection<YaRyadomNotification> _yaRyadomNotificationsToMe;

		private ICollection<YaRyadomComplaint> _yaRyadomMyComplaints;

		#endregion

		public long VkId { get; set; }

		public bool GuideCompleted { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string AboutMySelf { get; set; }

		public string VkUserAvatarUrl { get; set; }

		public Point LastLocation { get; set; }

		public bool NotificationsEnabled { get; set; }

		public bool GeolocationEnabled { get; set; }

		public string Address { get; set; }

		public DateTimeOffset VkNotificationsLockoutEnd { get; set; }

		public int VkNotificationsPerHourCount { get; set; }

		public int VkNotificationsPerDayCount { get; set; }

		public DateTimeOffset VkNotificationsLastSentDate { get; set; }

		#region Navigation properties

		public virtual ICollection<YaRyadomEvent> OwnYaRyadomEvents
		{
			get => _ownYaRyadomEvents ?? new List<YaRyadomEvent>();
			set => _ownYaRyadomEvents = value;
		}

		public virtual ICollection<YaRyadomUserTheme> YaRyadomUserThemes
		{
			get => _yaRyadomUserThemes ?? new List<YaRyadomUserTheme>();
			set => _yaRyadomUserThemes = value;
		}
		
		public virtual ICollection<YaRyadomUserApplication> YaRyadomUserApplications
		{
			get => _yaRyadomUserApplications ?? new List<YaRyadomUserApplication>();
			set => _yaRyadomUserApplications = value;
		}

		public virtual ICollection<YaRyadomReview> YaRyadomReviewsMine
		{
			get => _yaRyadomReviewsMine ?? new List<YaRyadomReview>();
			set => _yaRyadomReviewsMine = value;
		}

		public virtual ICollection<YaRyadomReview> YaRyadomReviewsAboutMe
		{
			get => _yaRyadomMyReviewsAboutMe ?? new List<YaRyadomReview>();
			set => _yaRyadomMyReviewsAboutMe = value;
		}

		public virtual ICollection<YaRyadomNotification> YaRyadomNotificationsToMe
		{
			get => _yaRyadomNotificationsToMe ?? new List<YaRyadomNotification>();
			set => _yaRyadomNotificationsToMe = value;
		}

		public virtual ICollection<YaRyadomComplaint> YaRyadomMyComplaints
		{
			get => _yaRyadomMyComplaints ?? new List<YaRyadomComplaint>();
			set => _yaRyadomMyComplaints = value;
		}
		#endregion
	}
}
