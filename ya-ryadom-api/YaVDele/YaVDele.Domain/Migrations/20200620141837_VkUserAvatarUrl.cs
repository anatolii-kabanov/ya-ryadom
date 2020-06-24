using Microsoft.EntityFrameworkCore.Migrations;

namespace YaVDele.Domain.Migrations
{
    public partial class VkUserAvatarUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "vk_user_avatar_url",
                table: "ya_v_dele_users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "vk_user_avatar_url",
                table: "ya_v_dele_users");
        }
    }
}
