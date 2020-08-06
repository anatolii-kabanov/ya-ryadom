using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.Mapping
{
	internal class YaRyadomReviewMap : YaRyadomEntityTypeConfiguration<YaRyadomReview>
	{
		public override void Configure(EntityTypeBuilder<YaRyadomReview> builder)
		{
			builder.ToTable("ya_ryadom_reviews");
			builder.HasKey(m => m.Id);
			builder.Property(m => m.Id).HasColumnName("id");
			builder.Property(m => m.Text).HasColumnName("text").HasMaxLength(1023).IsRequired();
			builder.Property(m => m.CreatedDate).HasColumnName("created_date").IsRequired();
			builder.Property(m => m.Rating).HasColumnName("rating").IsRequired();
			builder.Property(m => m.YaRyadomEventId).HasColumnName("ya_ryadom_event_id");
			builder.Property(m => m.YaRyadomUserReviewerId).HasColumnName("ya_ryadom_user_reviewer_id");
			builder.Property(m => m.YaRyadomUserToReviewId).HasColumnName("ya_ryadom_user_to_review_id");

			builder
				.HasOne(m => m.YaRyadomEvent)
				.WithMany(a => a.YaRyadomReviews)
				.HasForeignKey(s => s.YaRyadomEventId)
				.HasConstraintName("FK_ya_ryadom_event_id");
			builder
				.HasOne(m => m.YaRyadomUserReviewer)
				.WithMany(a => a.YaRyadomReviewsMine)
				.HasForeignKey(s => s.YaRyadomUserReviewerId)
				.HasConstraintName("FK_ya_ryadom_user_reviewer_id");
			builder
				.HasOne(m => m.YaRyadomUserToReview)
				.WithMany(a => a.YaRyadomReviewsAboutMe)
				.HasForeignKey(s => s.YaRyadomUserToReviewId)
				.HasConstraintName("FK_ya_ryadom_user_to_review_id");
		}
	}
}
