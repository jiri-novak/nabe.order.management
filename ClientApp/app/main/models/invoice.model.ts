import { BillOfDeliveryModel } from "./bill.of.delivery.model";

export class InvoiceModel {
    id: string;
    code: number;
    expeditionDate: Date;
    billsOfDelivery: Array<BillOfDeliveryModel> = [];

    static fromServerResponse(response: any): InvoiceModel {
        if (!response)
            return null;

        var model = new InvoiceModel();

        model.id = response.id;
        model.code = response.code;
        model.expeditionDate = response.expeditionDate;
        model.billsOfDelivery = BillOfDeliveryModel.fromServerResponseArray(response.billsOfDelivery);

        return model;
    }

    static fromServerResponseArray(response: any): Array<InvoiceModel> {        
        var models = new Array<InvoiceModel>();
        
        if (response) {
            models = response.map((value) => InvoiceModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            id: this.id,
            code: this.code,
            expeditionDate: this.expeditionDate,
            billsOfDelivery: this.billsOfDelivery.map(x => x.toJson)
        }
    }
}