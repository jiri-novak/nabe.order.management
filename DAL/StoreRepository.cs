using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace nabe.order.management.DAL
{
    public class StoreRepository : IStoreRepository
    {
        private readonly StoreDbContext _context;

        public StoreRepository(StoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<Store>> GetStoresAsync()
        {
            return await _context.Stores.ToListAsync();
        }

        public async Task InsertStoreAsync(Store store)
        {
            _context.Stores.Add(store);
            await _context.SaveChangesAsync();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
