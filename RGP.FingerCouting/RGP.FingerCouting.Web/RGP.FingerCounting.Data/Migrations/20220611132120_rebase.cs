using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RGP.FingerCounting.Data.Migrations
{
    public partial class rebase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemoteJsonData",
                table: "Remotes");

            migrationBuilder.AddColumn<string>(
                name: "PulsesData",
                table: "Buttons",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PulsesData",
                table: "Buttons");

            migrationBuilder.AddColumn<string>(
                name: "RemoteJsonData",
                table: "Remotes",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
