using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	internal class YaRyadomUserMap : YaRyadomEntityTypeConfiguration<YaRyadomUser>
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
			builder.Property(m => m.VkNotificationsLockoutEnd)
				.HasColumnName("vk_notifications_lockout_end");
			builder.Property(m => m.VkNotificationsLastSentDate)
				.HasColumnName("vk_notifications_last_sent_date");
			builder.HasIndex(p => p.VkNotificationsLockoutEnd);
			builder.Property(m => m.VkNotificationsPerHourCount)
				.HasColumnName("vk_notifications_per_hour_count")
				.HasDefaultValue(0);
			builder.Property(m => m.VkNotificationsPerDayCount)
				.HasColumnName("vk_notifications_per_day_count")
				.HasDefaultValue(0);
			builder.HasIndex(m => m.VkId).IsUnique();
			builder
				.Property(m => m.NotificationsEnabled)
				.HasColumnName("notifications_enabled")
				.IsRequired()
				.HasDefaultValue(false);
			builder.Property(m => m.Address).HasMaxLength(255).HasColumnName("address");
		}
	}
}
