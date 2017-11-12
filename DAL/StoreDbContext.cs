using Microsoft.EntityFrameworkCore;

namespace nabe.order.management.DAL
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext() : base()
        { }

        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options)
        { }

        public DbSet<Store> Stores { get; set; }
    }
}
