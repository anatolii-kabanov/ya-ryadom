using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	public class YaRyadomUserMap : YaRyadomEntityTypeConfiguration<YaRyadomUser>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomUser> builder)
		{
			builder.ToTable("ya_ryadom_users");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.GuideCompleted).HasColumnName("guide_completed");
			builder.Property(m => m.FirstName).HasColumnName("first_name");
			builder.Property(m => m.LastName).HasColumnName("last_name");
			builder.Property(m => m.AboutMySelf).HasColumnName("about_my_self");
			builder.Property(m => m.VkUserAvatarUrl).HasColumnName("vk_user_avatar_url");
			builder.Property(m => m.VkId).HasColumnName("vk_id");
			builder.Property(m => m.LastLocation).HasColumnName("last_location");
			builder.HasIndex(m => m.VkId).IsUnique();
		}
	}
}
