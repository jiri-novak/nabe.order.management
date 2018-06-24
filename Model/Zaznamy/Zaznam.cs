using System;

namespace nabe.order.management.Model.Zaznamy
{
    public abstract class Zaznam
    {
        public int Cislo { get; set; } 
        public DateTime Datum { get; set; }
        public string Jmeno { get; set; }
        public string ObjednatelJmeno { get; set; }
        public string Popis { get; set; }
        public string Poznamka { get; set; }
        public Stav Stav { get; set; }
        public Typ Typ { get; set; }
    }
}
