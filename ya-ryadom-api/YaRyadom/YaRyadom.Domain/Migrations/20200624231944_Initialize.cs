using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;

namespace YaRyadom.Domain.Migrations
{
    public partial class Initialize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "ya_ryadom_users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    vk_id = table.Column<long>(nullable: false),
                    guide_completed = table.Column<bool>(nullable: false),
                    first_name = table.Column<string>(nullable: true),
                    last_name = table.Column<string>(nullable: true),
                    about_my_self = table.Column<string>(nullable: true),
                    vk_user_avatar_url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ya_ryadom_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ya_ryadom_events",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(maxLength: 255, nullable: false),
                    description = table.Column<string>(maxLength: 1023, nullable: false),
                    date = table.Column<DateTimeOffset>(nullable: false),
                    max_quantity = table.Column<int>(nullable: false),
                    location = table.Column<Point>(type: "geography (point)", nullable: false),
                    revoked = table.Column<bool>(nullable: false),
                    ya_ryadom_user_owner_id = table.Column<int>(nullable: false),
                    SearchVector = table.Column<NpgsqlTsVector>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ya_ryadom_events", x => x.id);
                    table.ForeignKey(
                        name: "FK_ya_ryadom_events_ya_ryadom_users_ya_ryadom_user_owner_id",
                        column: x => x.ya_ryadom_user_owner_id,
                        principalTable: "ya_ryadom_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ya_ryadom_user_themes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<int>(nullable: false),
                    ya_ryadom_user_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ya_ryadom_user_themes", x => x.id);
                    table.ForeignKey(
                        name: "FK_ya_ryadom_user_themes_ya_ryadom_users_ya_ryadom_user_id",
                        column: x => x.ya_ryadom_user_id,
                        principalTable: "ya_ryadom_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_events_SearchVector",
                table: "ya_ryadom_events",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_events_ya_ryadom_user_owner_id",
                table: "ya_ryadom_events",
                column: "ya_ryadom_user_owner_id");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_user_themes_ya_ryadom_user_id",
                table: "ya_ryadom_user_themes",
                column: "ya_ryadom_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ya_ryadom_users_vk_id",
                table: "ya_ryadom_users",
                column: "vk_id",
                unique: true);

				migrationBuilder.Sql(
					@"CREATE TRIGGER ya_ryadom_event_search_vector_update BEFORE INSERT OR UPDATE
					ON ""ya_ryadom_events"" FOR EACH ROW EXECUTE PROCEDURE
					tsvector_update_trigger(""search_vector"", 'pg_catalog.russian', ""title"", ""description"");");
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
				migrationBuilder.Sql("DROP TRIGGER ya_ryadom_event_search_vector_update");
				migrationBuilder.DropTable(
                name: "ya_ryadom_events");

            migrationBuilder.DropTable(
                name: "ya_ryadom_user_themes");

            migrationBuilder.DropTable(
                name: "ya_ryadom_users");
        }
    }
}
