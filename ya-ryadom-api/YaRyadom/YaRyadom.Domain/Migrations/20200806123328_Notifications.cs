using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace YaRyadom.Domain.Migrations
{
    public partial class Notifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "vk_notifications_last_sent_date",
                table: "ya_ryadom_users",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "vk_notifications_lockout_end",
                table: "ya_ryadom_users",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "vk_notifications_per_day_count",
                table: "ya_ryadom_users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "vk_notifications_per_hour_count",
                table: "ya_ryadom_users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ya_ryadom_notifications",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    created_date = table.Column<DateTimeOffset>(nullable: false),
                    is_sent = table.Column<bool>(nullable: false, defaultValue: false),
                    sent_date = table.Column<DateTimeOffset>(nullable: true),
                    notification_type = table.Column<int>(nullable: false),
                    message = table.Column<string>(maxLength: 254, nullable: true),
                    ya_ryadom_event_id = table.Column<int>(nullable: true),
                    ya_ryadom_user_to_send_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ya_ryadom_notifications", x => x.id);
                    table.ForeignKey(
                        name: "FK_ya_ryadom_event_id",
                        column: x => x.ya_ryadom_event_id,
                        principalTable: "ya_ryadom_events",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ya_ryadom_user_to_send_id",
                        column: x => x.ya_ryadom_user_to_send_id,
                        principalTable: "ya_ryadom_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_users_vk_notifications_lockout_end",
                table: "ya_ryadom_users",
                column: "vk_notifications_lockout_end");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_notifications_ya_ryadom_event_id",
                table: "ya_ryadom_notifications",
                column: "ya_ryadom_event_id");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_notifications_ya_ryadom_user_to_send_id",
                table: "ya_ryadom_notifications",
                column: "ya_ryadom_user_to_send_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ya_ryadom_notifications");

            migrationBuilder.DropIndex(
                name: "IX_ya_ryadom_users_vk_notifications_lockout_end",
                table: "ya_ryadom_users");

            migrationBuilder.DropColumn(
                name: "vk_notifications_last_sent_date",
                table: "ya_ryadom_users");

            migrationBuilder.DropColumn(
                name: "vk_notifications_lockout_end",
                table: "ya_ryadom_users");

            migrationBuilder.DropColumn(
                name: "vk_notifications_per_day_count",
                table: "ya_ryadom_users");

            migrationBuilder.DropColumn(
                name: "vk_notifications_per_hour_count",
                table: "ya_ryadom_users");
        }
    }
}
