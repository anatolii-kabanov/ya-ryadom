﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;
using YaRyadom.Domain.DbContexts;

namespace YaRyadom.Domain.Migrations
{
    [DbContext(typeof(YaRyadomDbContext))]
    [Migration("20200718103910_UpdateUserAndEvents")]
    partial class UpdateUserAndEvents
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:PostgresExtension:postgis", ",,")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnName("address")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnName("created_date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset?>("Date")
                        .HasColumnName("date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("description")
                        .HasColumnType("character varying(1023)")
                        .HasMaxLength(1023);

                    b.Property<bool>("Ended")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ended")
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<Point>("Location")
                        .IsRequired()
                        .HasColumnName("location")
                        .HasColumnType("geography (point)");

                    b.Property<int>("MaxQuantity")
                        .HasColumnName("max_quantity")
                        .HasColumnType("integer");

                    b.Property<bool>("Revoked")
                        .HasColumnName("revoked")
                        .HasColumnType("boolean");

                    b.Property<NpgsqlTsVector>("SearchVector")
                        .HasColumnName("search_vector")
                        .HasColumnType("tsvector");

                    b.Property<TimeSpan?>("Time")
                        .HasColumnName("time")
                        .HasColumnType("interval");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnName("title")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<int>("YaRyadomUserOwnerId")
                        .HasColumnName("ya_ryadom_user_owner_id")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Date");

                    b.HasIndex("SearchVector")
                        .HasAnnotation("Npgsql:IndexMethod", "GIN");

                    b.HasIndex("YaRyadomUserOwnerId");

                    b.ToTable("ya_ryadom_events");
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomEventTheme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Type")
                        .HasColumnName("type")
                        .HasColumnType("integer");

                    b.Property<int>("YaRyadomEventId")
                        .HasColumnName("ya_ryadom_event_id")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("YaRyadomEventId");

                    b.ToTable("ya_ryadom_event_themes");
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomReview", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnName("created_date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Rating")
                        .HasColumnName("rating")
                        .HasColumnType("integer");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnName("text")
                        .HasColumnType("character varying(1023)")
                        .HasMaxLength(1023);

                    b.Property<int>("YaRyadomEventId")
                        .HasColumnName("ya_ryadom_event_id")
                        .HasColumnType("integer");

                    b.Property<int>("YaRyadomUserReviewerId")
                        .HasColumnName("ya_ryadom_user_reviewer_id")
                        .HasColumnType("integer");

                    b.Property<int>("YaRyadomUserToReviewId")
                        .HasColumnName("ya_ryadom_user_to_review_id")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("YaRyadomEventId");

                    b.HasIndex("YaRyadomUserReviewerId");

                    b.HasIndex("YaRyadomUserToReviewId");

                    b.ToTable("ya_ryadom_reviews");
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AboutMySelf")
                        .HasColumnName("about_my_self")
                        .HasColumnType("text");

                    b.Property<string>("Address")
                        .HasColumnName("address")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("FirstName")
                        .HasColumnName("first_name")
                        .HasColumnType("text");

                    b.Property<bool>("GuideCompleted")
                        .HasColumnName("guide_completed")
                        .HasColumnType("boolean");

                    b.Property<Point>("LastLocation")
                        .HasColumnName("last_location")
                        .HasColumnType("geometry");

                    b.Property<string>("LastName")
                        .HasColumnName("last_name")
                        .HasColumnType("text");

                    b.Property<bool>("NotificationsEnabled")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("notifications_enabled")
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<long>("VkId")
                        .HasColumnName("vk_id")
                        .HasColumnType("bigint");

                    b.Property<string>("VkUserAvatarUrl")
                        .HasColumnName("vk_user_avatar_url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("VkId")
                        .IsUnique();

                    b.ToTable("ya_ryadom_users");
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomUserApplication", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("Revoked")
                        .HasColumnName("revoked")
                        .HasColumnType("boolean");

                    b.Property<int>("Status")
                        .HasColumnName("status")
                        .HasColumnType("integer");

                    b.Property<int>("YaRyadomEventId")
                        .HasColumnName("ya_ryadom_event_id")
                        .HasColumnType("integer");

                    b.Property<int>("YaRyadomUserRequestedId")
                        .HasColumnName("ya_ryadom_user_requested_id")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("YaRyadomEventId");

                    b.HasIndex("YaRyadomUserRequestedId");

                    b.ToTable("ya_ryadom_user_applications");
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomUserTheme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Type")
                        .HasColumnName("type")
                        .HasColumnType("integer");

                    b.Property<int>("YaRyadomUserId")
                        .HasColumnName("ya_ryadom_user_id")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("YaRyadomUserId");

                    b.ToTable("ya_ryadom_user_themes");
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomEvent", b =>
                {
                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomUser", "YaRyadomUserOwner")
                        .WithMany("OwnYaRyadomEvents")
                        .HasForeignKey("YaRyadomUserOwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomEventTheme", b =>
                {
                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomEvent", "YaRyadomEvent")
                        .WithMany("YaRyadomEventThemes")
                        .HasForeignKey("YaRyadomEventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomReview", b =>
                {
                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomEvent", "YaRyadomEvent")
                        .WithMany("YaRyadomReviews")
                        .HasForeignKey("YaRyadomEventId")
                        .HasConstraintName("FK_ya_ryadom_event_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomUser", "YaRyadomUserReviewer")
                        .WithMany("YaRyadomReviewsMine")
                        .HasForeignKey("YaRyadomUserReviewerId")
                        .HasConstraintName("FK_ya_ryadom_user_reviewer_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomUser", "YaRyadomUserToReview")
                        .WithMany("YaRyadomReviewsAboutMe")
                        .HasForeignKey("YaRyadomUserToReviewId")
                        .HasConstraintName("FK_ya_ryadom_user_to_review_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomUserApplication", b =>
                {
                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomEvent", "YaRyadomEvent")
                        .WithMany("YaRyadomUserApplications")
                        .HasForeignKey("YaRyadomEventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomUser", "YaRyadomUserRequested")
                        .WithMany("YaRyadomUserApplications")
                        .HasForeignKey("YaRyadomUserRequestedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("YaRyadom.Domain.Entities.YaRyadomUserTheme", b =>
                {
                    b.HasOne("YaRyadom.Domain.Entities.YaRyadomUser", "YaRyadomUser")
                        .WithMany("YaRyadomUserThemes")
                        .HasForeignKey("YaRyadomUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
