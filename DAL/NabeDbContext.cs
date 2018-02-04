using Microsoft.EntityFrameworkCore;
using nabe.order.management.DAL.Entities;

namespace nabe.order.management.DAL
{
    public class NabeDbContext : DbContext
    {
        public NabeDbContext() : base()
        {
        }

        public NabeDbContext(DbContextOptions<NabeDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=nabe.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Company>()
                .ToTable("companies")
                .OwnsOne(c => c.Address);

            modelBuilder.Entity<Customer>()
                .ToTable("customers");

            modelBuilder.Entity<ExternalDelivery>()
                .ToTable("external_deliveries");

            modelBuilder.Entity<ExternalDeliveryCustomer>()
                .ToTable("external_deliveries_customers")
                .HasKey(t => new { t.ExternalDeliveryId, t.CustomerId });

            modelBuilder.Entity<Invoice>()
                .ToTable("invoices");

            modelBuilder.Entity<Order>()
                .ToTable("orders");
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
