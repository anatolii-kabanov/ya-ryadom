using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	internal class YaRyadomNotificationMap : YaRyadomEntityTypeConfiguration<YaRyadomNotification>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomNotification> builder)
		{
			builder.ToTable("ya_ryadom_notifications");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.CreatedDate).HasColumnName("created_date").IsRequired();
			builder.Property(m => m.IsSent).HasColumnName("is_sent").IsRequired().HasDefaultValue(false);
			builder.Property(m => m.SentDate).HasColumnName("sent_date");
			builder.Property(m => m.NotificationType).HasColumnName("notification_type").IsRequired();
			builder.Property(m => m.Message).HasColumnName("message").HasMaxLength(254);
			builder.Property(m => m.YaRyadomEventId).HasColumnName("ya_ryadom_event_id");
			builder.Property(m => m.YaRyadomUserToSendId).HasColumnName("ya_ryadom_user_to_send_id");

			builder
				.HasOne(m => m.YaRyadomUserToSend)
				.WithMany(a => a.YaRyadomNotificationsToMe)
				.HasForeignKey(s => s.YaRyadomUserToSendId)
				.HasConstraintName("FK_ya_ryadom_user_to_send_id");

			builder
				.HasOne(m => m.YaRyadomEvent)
				.WithMany(a => a.YaRyadomNotifications)
				.HasForeignKey(s => s.YaRyadomEventId)
				.HasConstraintName("FK_ya_ryadom_event_id");
		}
	}
}
