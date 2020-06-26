using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	public class YaRyadomUserApplicationMap : YaRyadomEntityTypeConfiguration<YaRyadomUserApplication>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomUserApplication> builder)
		{
			builder.ToTable("ya_ryadom_user_applications");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Revoked).HasColumnName("revoked");
			builder.Property(m => m.Status).HasColumnName("status");
			builder.Property(m => m.YaRyadomUserRequestedId).HasColumnName("ya_ryadom_user_requested_id");
			builder.Property(m => m.YaRyadomEventId).HasColumnName("ya_ryadom_event_id");

			builder.HasOne(m => m.YaRyadomUserRequested).WithMany(a => a.YaRyadomUserApplications).HasForeignKey(s => s.YaRyadomUserRequestedId);
			builder.HasOne(m => m.YaRyadomEvent).WithMany(a => a.YaRyadomUserApplications).HasForeignKey(s => s.YaRyadomEventId);
		}
	}
}
