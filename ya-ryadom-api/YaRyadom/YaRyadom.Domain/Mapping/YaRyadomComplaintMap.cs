using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	internal class YaRyadomComplaintMap : YaRyadomEntityTypeConfiguration<YaRyadomComplaint>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomComplaint> builder)
		{
			builder.ToTable("ya_ryadom_complaints");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Text).HasColumnName("text").HasMaxLength(511);
			builder.Property(m => m.ComplaintType).HasColumnName("complaint_type").IsRequired();
			builder.HasIndex(p => p.ComplaintType);

			builder.Property(m => m.YaRyadomEventId).HasColumnName("ya_ryadom_event_id");
			builder.Property(m => m.YaRyadomFromUserId).HasColumnName("ya_ryadom_from_user_id");

			builder
				.HasOne(m => m.YaRyadomEvent)
				.WithMany(a => a.YaRyadomComplaints)
				.HasForeignKey(s => s.YaRyadomEventId)
				.HasConstraintName("FK_ya_ryadom_event_id");

			builder
				.HasOne(m => m.YaRyadomFromUser)
				.WithMany(a => a.YaRyadomMyComplaints)
				.HasForeignKey(s => s.YaRyadomFromUserId)
				.HasConstraintName("FK_ya_ryadom_from_user_id");
		}
	}
}
