using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace nabe.order.management.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DIC = table.Column<string>(nullable: true),
                    ICO = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Address_Municipality = table.Column<string>(nullable: true),
                    Address_State = table.Column<string>(nullable: true),
                    Address_Street = table.Column<string>(nullable: true),
                    Address_StreetNumber = table.Column<int>(nullable: false),
                    Address_ZipCode = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<long>(nullable: true),
                    ExpeditionDate = table.Column<DateTime>(nullable: false),
                    LaserProgram = table.Column<int>(nullable: false),
                    SentForManufacturing = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillOfDelivery",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<long>(nullable: false),
                    InvoiceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillOfDelivery", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillOfDelivery_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExternalDelivery",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Comments = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    InvoiceId = table.Column<int>(nullable: true),
                    State = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalDelivery", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExternalDelivery_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompanyId = table.Column<int>(nullable: true),
                    ExternalDeliveryId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Customers_ExternalDelivery_ExternalDeliveryId",
                        column: x => x.ExternalDeliveryId,
                        principalTable: "ExternalDelivery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillOfDelivery_InvoiceId",
                table: "BillOfDelivery",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyId",
                table: "Customers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_ExternalDeliveryId",
                table: "Customers",
                column: "ExternalDeliveryId");

            migrationBuilder.CreateIndex(
                name: "IX_ExternalDelivery_InvoiceId",
                table: "ExternalDelivery",
                column: "InvoiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillOfDelivery");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "ExternalDelivery");

            migrationBuilder.DropTable(
                name: "Invoices");
        }
    }
}
