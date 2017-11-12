using System.Collections.Generic;
using System.Threading.Tasks;

namespace nabe.order.management.DAL
{
    public interface IStoreRepository
    {
        Task<List<Store>> GetStoresAsync();
        Task InsertStoreAsync(Store store);
        void Save();
    }
}
