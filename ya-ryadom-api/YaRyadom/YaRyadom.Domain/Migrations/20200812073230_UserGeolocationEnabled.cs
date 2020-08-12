using Microsoft.EntityFrameworkCore.Migrations;

namespace YaRyadom.Domain.Migrations
{
    public partial class UserGeolocationEnabled : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "geolocation_enabled",
                table: "ya_ryadom_users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "geolocation_enabled",
                table: "ya_ryadom_users");
        }
    }
}
