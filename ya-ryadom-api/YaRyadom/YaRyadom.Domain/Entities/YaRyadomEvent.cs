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

		#endregion

		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public TimeSpan? Time { get; set; }

		public DateTimeOffset? Date { get; set; }

		public int MaxQuantity { get; set; }

		public Point Location { get; set; }

		public bool Revoked { get; set; }

		public int YaRyadomUserOwnerId { get; set; }

		public NpgsqlTsVector SearchVector { get; set; }

		#region Navigation properties

		public YaRyadomUser YaRyadomUserOwner { get; set; }

		public ICollection<YaRyadomEventTheme> YaRyadomEventThemes
		{
			get => _yaRyadomEventThemes ?? new List<YaRyadomEventTheme>();
			set => _yaRyadomEventThemes = value;
		}

		public ICollection<YaRyadomUserApplication> YaRyadomUserApplications
		{
			get => _yaRyadomUserApplications ?? new List<YaRyadomUserApplication>();
			set => _yaRyadomUserApplications = value;
		}

		public ICollection<YaRyadomReview> YaRyadomReviews
		{
			get => _yaRyadomReviews ?? new List<YaRyadomReview>();
			set => _yaRyadomReviews = value;
		}

		#endregion
	}
}
