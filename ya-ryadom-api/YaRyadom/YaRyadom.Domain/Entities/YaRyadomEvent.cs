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

		#endregion

		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public TimeSpan? Time { get; set; }

		public DateTimeOffset? Date { get; set; }

		public int MaxQuantity { get; set; }

		public Point Location { get; set; }

		public bool Revoked { get; set; }

		public int YaVDeleUserOwnerId { get; set; }

		public NpgsqlTsVector SearchVector { get; set; }

		#region Navigation properties

		public YaRyadomUser YaVDeleUserOwner { get; set; }

		public ICollection<YaRyadomEventTheme> YaRyadomEventThemes
		{
			get => _yaRyadomEventThemes ?? new List<YaRyadomEventTheme>();
			set => _yaRyadomEventThemes = value;
		}

		#endregion
	}
}
