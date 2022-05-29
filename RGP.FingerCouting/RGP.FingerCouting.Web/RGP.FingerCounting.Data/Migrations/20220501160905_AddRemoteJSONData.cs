using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RGP.FingerCounting.Data.Migrations
{
    public partial class AddRemoteJSONData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RemoteJsonData",
                table: "Remotes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemoteJsonData",
                table: "Remotes");
        }
    }
}
