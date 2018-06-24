import { Stav } from "./enums/stav.enum";
import { Typ } from "./enums/typ.enum";
import { ObjednavkaModel, PoptavkaModel, NabidkaModel } from ".";

export class ZaznamModel {
    cislo: number;
    datum: Date;
    jmeno: string;
    objednatelJmeno: string;
    popis: string;
    poznamka: string;
    stav: Stav;
    typ: Typ;

    isEdit: boolean;

    static fromServerResponse(response: any): ZaznamModel {
        if (!response)
            return null;

        let model: ZaznamModel;

        switch (response.typ) {
            case Typ.Nabidka:
                model = new NabidkaModel();
                break;
            case Typ.Poptavka:
                model = new PoptavkaModel();
                break;
            case Typ.Objednavka:
                model = new ObjednavkaModel();
                break;
        }

        model.cislo = response.cislo;
        model.datum = response.datum;
        model.jmeno = response.jmeno;
        model.objednatelJmeno = response.objednatelJmeno;
        model.popis = response.popis;
        model.poznamka = response.poznamka;
        model.stav = response.stav;
        model.typ = response.typ;

        model.isEdit = false;

        return model;
    }

    static fromServerResponseArray(response: any): Array<ZaznamModel> {
        var models = new Array<ZaznamModel>();

        if (response) {
            models = response.map((value) => ZaznamModel.fromServerResponse(value));
        }

        return models;
    }

    // toJson() {
    //     return {
    //         id: this.id,
    //         code: this.code,
    //         date: this.date,
    //         customer: this.customer.toJson(),
    //         description: this.description,
    //         deliveryDate: this.deliveryDate,
    //         laserProgram: this.laserProgram,
    //         sentForManufacturing: this.sentForManufacturing,
    //         externalDeliveries: this.externalDeliveries.map(x => x.toJson()),
    //         invoice: this.invoice.toJson()
    //     }
    // }
}