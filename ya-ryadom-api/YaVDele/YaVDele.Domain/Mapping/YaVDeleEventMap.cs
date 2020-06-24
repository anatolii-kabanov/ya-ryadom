using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaVDele.Domain.Entities;
using YaVDele.Domain.EntityTypeConfigurations;

namespace YaVDele.Domain.Mapping
{
	public class YaVDeleEventMap : YaVDeleEntityTypeConfiguration<YaVDeleEvent>
	{
		public override void Configure(EntityTypeBuilder<YaVDeleEvent> builder)
		{
			builder.ToTable("ya_v_dele_events");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Title).HasColumnName("title").HasMaxLength(255).IsRequired();
			builder.Property(m => m.Description).HasColumnName("description").HasMaxLength(1023).IsRequired();
			builder.Property(m => m.Date).HasColumnName("date").IsRequired();
			builder.Property(m => m.Location).HasColumnName("location").IsRequired().HasColumnType("geography (point)");
			builder.Property(m => m.MaxQuantiyty).HasColumnName("max_quantiyty").IsRequired();
			builder.Property(m => m.Revoked).HasColumnName("revoked").IsRequired();
			builder.Property(m => m.YaVDeleUserOwnerId).HasColumnName("ya_v_dele_user_owner_id");
			builder.HasIndex(p => p.SearchVector).HasMethod("GIN");

			builder.HasOne(m => m.YaVDeleUserOwner).WithMany(a => a.OwnYaVDeleEvents).HasForeignKey(s => s.YaVDeleUserOwnerId);
		}
	}
}
