using System;

namespace nabe.order.management.Model.Zaznamy
{
    public class Nabidka : Zaznam
    {
        public Nabidka()
        {
            Typ = Typ.Nabidka;
        }

        public DateTime DatumNabidky { get; set; }
    }
}
