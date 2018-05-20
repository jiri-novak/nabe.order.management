using System;
using System.Collections.Generic;

namespace nabe.order.management.Model
{
    public class Objednavka : Zaznam
    {
        public int CisloObjednavky { get; set; }

        public DateTime DatumDodani { get; set; }

        public string ExterniDodavka1 { get; set; }
        public string ExterniDodavka2 { get; set; }
        public string ExtenniDodavka3 { get; set; }

        public Splnuje ProgramLaser { get; set; }

        public string Vykresy { get; set; }

        public Splnuje ZadanoDoVyroby { get; set; }
        public DateTime DatumExpedice { get; set; }

        public decimal Cena { get; set; }
        public string Faktura { get; set; }
        public DateTime FakturaDatumOdeslani { get; set; }

        public IEnumerable<DodaciList> DodaciListy { get; set; }
    }
}
