using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	public class YaRyadomEventThemeMap : YaRyadomEntityTypeConfiguration<YaRyadomEventTheme>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomEventTheme> builder)
		{
			builder.ToTable("ya_ryadom_event_themes");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Type).HasColumnName("type");
			builder.Property(m => m.YaRyadomEventId).HasColumnName("ya_ryadom_event_id");

			builder.HasOne(m => m.YaRyadomEvent).WithMany(a => a.YaRyadomEventThemes).HasForeignKey(s => s.YaRyadomEventId);
		}
	}
}
