using NetTopologySuite.Geometries;
using NpgsqlTypes;
using System;
using System.Collections.Generic;
using YaRyadom.Domain.Entities.Base;

namespace YaRyadom.Domain.Entities
{
	public class YaRyadomEvent : BaseEntity
	{
		#region Navigation fields		

		private ICollection<YaRyadomEventTheme> _yaRyadomEventThemes;

		private ICollection<YaRyadomUserApplication> _yaRyadomUserApplications;

		private ICollection<YaRyadomReview> _yaRyadomReviews;

		private ICollection<YaRyadomNotification> _yaRyadomNotifications;

		private ICollection<YaRyadomComplaint> _yaRyadomComplaints;

		#endregion

		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public TimeSpan? Time { get; set; }

		public DateTimeOffset? Date { get; set; }

		public int MaxQuantity { get; set; }

		public Point Location { get; set; }

		public bool Revoked { get; set; }

		public string Address { get; set; }

		public int YaRyadomUserOwnerId { get; set; }

		public bool Ended { get; set; }

		public NpgsqlTsVector SearchVector { get; set; }

		#region Navigation properties

		public virtual YaRyadomUser YaRyadomUserOwner { get; set; }

		public virtual ICollection<YaRyadomEventTheme> YaRyadomEventThemes
		{
			get => _yaRyadomEventThemes ?? new List<YaRyadomEventTheme>();
			set => _yaRyadomEventThemes = value;
		}

		public virtual ICollection<YaRyadomUserApplication> YaRyadomUserApplications
		{
			get => _yaRyadomUserApplications ?? new List<YaRyadomUserApplication>();
			set => _yaRyadomUserApplications = value;
		}

		public virtual ICollection<YaRyadomReview> YaRyadomReviews
		{
			get => _yaRyadomReviews ?? new List<YaRyadomReview>();
			set => _yaRyadomReviews = value;
		}

		public virtual ICollection<YaRyadomNotification> YaRyadomNotifications
		{
			get => _yaRyadomNotifications ?? new List<YaRyadomNotification>();
			set => _yaRyadomNotifications = value;
		}

		public virtual ICollection<YaRyadomComplaint> YaRyadomComplaints
		{
			get => _yaRyadomComplaints ?? new List<YaRyadomComplaint>();
			set => _yaRyadomComplaints = value;
		}

		#endregion
	}
}
