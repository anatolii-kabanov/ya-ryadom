using NetTopologySuite.Geometries;
using NpgsqlTypes;
using System;
using YaVDele.Domain.Entities.Base;

namespace YaVDele.Domain.Entities
{
	public class YaVDeleEvent : BaseEntity
	{
		#region Navigation fields		

		#endregion

		public string Title { get; set; }

		public string Description { get; set; }

		public DateTimeOffset Date { get; set; }

		public int MaxQuantiyty { get; set; }

		public Point Location { get; set; }

		public bool Revoked { get; set; }

		public int YaVDeleUserOwnerId { get; set; }

		public NpgsqlTsVector SearchVector { get; set; }

		#region Navigation properties

		public YaVDeleUser YaVDeleUserOwner { get; set; }

		#endregion
	}
}
