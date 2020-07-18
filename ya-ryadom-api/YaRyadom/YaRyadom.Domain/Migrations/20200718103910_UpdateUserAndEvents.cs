using Microsoft.EntityFrameworkCore.Migrations;

namespace YaRyadom.Domain.Migrations
{
    public partial class UpdateUserAndEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ya_ryadom_reviews_ya_ryadom_events_ya_ryadom_event_id",
                table: "ya_ryadom_reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_ya_ryadom_reviews_ya_ryadom_users_ya_ryadom_user_reviewer_id",
                table: "ya_ryadom_reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_ya_ryadom_reviews_ya_ryadom_users_ya_ryadom_user_to_review_~",
                table: "ya_ryadom_reviews");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "ya_ryadom_users",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "notifications_enabled",
                table: "ya_ryadom_users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "ya_ryadom_events",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ended",
                table: "ya_ryadom_events",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_events_date",
                table: "ya_ryadom_events",
                column: "date");

            migrationBuilder.AddForeignKey(
                name: "FK_ya_ryadom_event_id",
                table: "ya_ryadom_reviews",
                column: "ya_ryadom_event_id",
                principalTable: "ya_ryadom_events",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ya_ryadom_user_reviewer_id",
                table: "ya_ryadom_reviews",
                column: "ya_ryadom_user_reviewer_id",
                principalTable: "ya_ryadom_users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ya_ryadom_user_to_review_id",
                table: "ya_ryadom_reviews",
                column: "ya_ryadom_user_to_review_id",
                principalTable: "ya_ryadom_users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ya_ryadom_event_id",
                table: "ya_ryadom_reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_ya_ryadom_user_reviewer_id",
                table: "ya_ryadom_reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_ya_ryadom_user_to_review_id",
                table: "ya_ryadom_reviews");

            migrationBuilder.DropIndex(
                name: "IX_ya_ryadom_events_date",
                table: "ya_ryadom_events");

            migrationBuilder.DropColumn(
                name: "address",
                table: "ya_ryadom_users");

            migrationBuilder.DropColumn(
                name: "notifications_enabled",
                table: "ya_ryadom_users");

            migrationBuilder.DropColumn(
                name: "address",
                table: "ya_ryadom_events");

            migrationBuilder.DropColumn(
                name: "ended",
                table: "ya_ryadom_events");

            migrationBuilder.AddForeignKey(
                name: "FK_ya_ryadom_reviews_ya_ryadom_events_ya_ryadom_event_id",
                table: "ya_ryadom_reviews",
                column: "ya_ryadom_event_id",
                principalTable: "ya_ryadom_events",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ya_ryadom_reviews_ya_ryadom_users_ya_ryadom_user_reviewer_id",
                table: "ya_ryadom_reviews",
                column: "ya_ryadom_user_reviewer_id",
                principalTable: "ya_ryadom_users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ya_ryadom_reviews_ya_ryadom_users_ya_ryadom_user_to_review_~",
                table: "ya_ryadom_reviews",
                column: "ya_ryadom_user_to_review_id",
                principalTable: "ya_ryadom_users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
