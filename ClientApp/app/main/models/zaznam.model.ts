import { Stav } from "./enums/stav.enum";
import { Typ } from "./enums/typ.enum";

export abstract class Zaznam {
    cislo: number;
    datum: Date;
    jmeno: string;
    popis: string;
    poznamka: string;
    stav: Stav;
    typ: Typ;
}