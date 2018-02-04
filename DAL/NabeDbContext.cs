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

            modelBuilder.Entity<Company>(x => {
                x.OwnsOne(c => c.Address);
            });

            modelBuilder.Entity<Customer>(x => {
                x.HasOne(c => c.Company);
            });
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
    }
}
