using nabe.order.management.Model;
using System.Collections.Generic;

namespace nabe.order.management.Repository
{
    internal class ObjednateleRepo
    {
        private readonly List<Objednatel> _objednatele;

        public ObjednateleRepo()
        {
            _objednatele = new List<Objednatel>()
            {
                new Objednatel
                {
                    Jmeno = "EYELEVEL s.r.o.",
                    Adresa = new Adresa
                    {
                        Ulice = "NUPAKY",
                        CisloPopisne = "148",
                        Obec = "RICANY",
                        Stat = "Czech Republic",
                        PSC = 25101
                    },
                    ICO = "25716433",
                    DIC = "CZ699003075"
                }
            };
        }

        public IEnumerable<Objednatel> GetAll()
        {
            return _objednatele;
        }
    }
}
