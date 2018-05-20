using nabe.order.management.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace nabe.order.management.Repository
{
    internal class ZaznamyRepo
    {
        private readonly List<Zaznam> _zaznamy;

        public ZaznamyRepo()
        {
            _zaznamy = new List<Zaznam>
            {
                new Poptavka
                {
                    Cislo = 611,
                    Datum = new DateTime(2017, 10, 24),
                    Jmeno = "Jager",
                    ObjednatelJmeno = "EYELEVEL s r.o",
                    Popis = "popis",
                    Poznamka = "poznamka",
                    Stav = Stav.Prijato,
                    Typ = Typ.Poptavka
                }
            };
        }

        public IEnumerable<Zaznam> GetAll()
        {
            return _zaznamy;
        }

        public IEnumerable<Zaznam> GetAll(Func<Typ, bool> typPredicate)
        {
            return _zaznamy.Where(x => typPredicate(x.Typ));
        }
    }
}
