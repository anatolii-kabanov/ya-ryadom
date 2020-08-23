using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace YaRyadom.Domain.Migrations
{
    public partial class Complaints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ya_ryadom_complaints",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    text = table.Column<string>(maxLength: 511, nullable: true),
                    complaint_type = table.Column<int>(nullable: false),
                    ya_ryadom_event_id = table.Column<int>(nullable: false),
                    ya_ryadom_from_user_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ya_ryadom_complaints", x => x.id);
                    table.ForeignKey(
                        name: "FK_ya_ryadom_event_id",
                        column: x => x.ya_ryadom_event_id,
                        principalTable: "ya_ryadom_events",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ya_ryadom_from_user_id",
                        column: x => x.ya_ryadom_from_user_id,
                        principalTable: "ya_ryadom_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_complaints_complaint_type",
                table: "ya_ryadom_complaints",
                column: "complaint_type");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_complaints_ya_ryadom_event_id",
                table: "ya_ryadom_complaints",
                column: "ya_ryadom_event_id");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_complaints_ya_ryadom_from_user_id",
                table: "ya_ryadom_complaints",
                column: "ya_ryadom_from_user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ya_ryadom_complaints");
        }
    }
}
