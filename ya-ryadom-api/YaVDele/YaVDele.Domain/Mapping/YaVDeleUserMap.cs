using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaVDele.Domain.Entities;
using YaVDele.Domain.EntityTypeConfigurations;

namespace YaVDele.Domain.Mapping
{
	public class YaVDeleUserMap : YaVDeleEntityTypeConfiguration<YaVDeleUser>
	{
		public override void Configure(EntityTypeBuilder<YaVDeleUser> builder)
		{
			builder.ToTable("ya_v_dele_users");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.GuideCompleted).HasColumnName("guide_completed");
			builder.Property(m => m.FirstName).HasColumnName("first_name");
			builder.Property(m => m.LastName).HasColumnName("last_name");
			builder.Property(m => m.GuideCompleted).HasColumnName("guide_completed");
			builder.Property(m => m.VkUserAvatarUrl).HasColumnName("vk_user_avatar_url");
			builder.Property(m => m.VkId).HasColumnName("vk_id");
			builder.HasIndex(m => m.VkId).IsUnique();
		}
	}
}
