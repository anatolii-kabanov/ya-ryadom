using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	public class YaRyadomEventMap : YaRyadomEntityTypeConfiguration<YaRyadomEvent>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomEvent> builder)
		{
			builder.ToTable("ya_ryadom_events");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Title).HasColumnName("title").HasMaxLength(255).IsRequired();
			builder.Property(m => m.Description).HasColumnName("description").HasMaxLength(1023).IsRequired();
			builder.Property(m => m.CreatedDate).HasColumnName("created_date").IsRequired();
			builder.Property(m => m.Date).HasColumnName("date");
			builder.Property(m => m.Time).HasColumnName("time");
			builder.Property(m => m.Location).HasColumnName("location").IsRequired().HasColumnType("geography (point)");
			builder.Property(m => m.MaxQuantity).HasColumnName("max_quantity").IsRequired();
			builder.Property(m => m.Revoked).HasColumnName("revoked").IsRequired();
			builder.Property(m => m.YaVDeleUserOwnerId).HasColumnName("ya_ryadom_user_owner_id");
			builder.Property(m => m.SearchVector).HasColumnName("search_vector");
			builder.HasIndex(p => p.SearchVector).HasMethod("GIN");

			builder.HasOne(m => m.YaVDeleUserOwner).WithMany(a => a.OwnYaVDeleEvents).HasForeignKey(s => s.YaVDeleUserOwnerId);
		}
	}
}
