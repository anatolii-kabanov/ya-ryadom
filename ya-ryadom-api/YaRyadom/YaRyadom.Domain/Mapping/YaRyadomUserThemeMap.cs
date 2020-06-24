using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	public class YaRyadomUserThemeMap : YaRyadomEntityTypeConfiguration<YaRyadomUserTheme>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomUserTheme> builder)
		{
			builder.ToTable("ya_ryadom_user_themes");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Type).HasColumnName("type");
			builder.Property(m => m.YaRyadomUserId).HasColumnName("ya_ryadom_user_id");

			builder.HasOne(m => m.YaRyadomUser).WithMany(a => a.YaRyadomUserThemes).HasForeignKey(s => s.YaRyadomUserId);
		}
	}
}
