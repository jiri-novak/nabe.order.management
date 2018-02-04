import { CustomerModel } from "./customer.model";
import { LaserProgram } from "./enums/laser.program.enum";
import { ExternalDeliveryModel } from "./external.delivery.model";
import { InvoiceModel } from "./invoice.model";

export class OrderModel {
    id: string;
    code: number;
    date: Date;
    customer: CustomerModel;
    description: string;
    deliveryDate: Date;
    invoice: InvoiceModel;
    laserProgram: LaserProgram;
    sentForManufacturing: boolean;
    externalDeliveries: Array<ExternalDeliveryModel> = [];

    isEdit: boolean;

    static fromServerResponse(response: any): OrderModel {
        if (!response)
            return null;

        var model = new OrderModel();

        model.id = response.id;
        model.code = response.code;
        model.date = response.date;
        model.customer = CustomerModel.fromServerResponse(response.customer);
        model.description = response.description;
        model.deliveryDate = response.deliveryDate;
        model.invoice = InvoiceModel.fromServerResponse(response.invoice);
        model.laserProgram = response.laserProgram;
        model.sentForManufacturing = response.sentForManufacturing;
        model.externalDeliveries = ExternalDeliveryModel.fromServerResponseArray(response.externalDeliveries);

        return model;
    }

    static fromServerResponseArray(response: any): Array<OrderModel> {        
        var models = new Array<OrderModel>();
        
        if (response) {
            models = response.map((value) => OrderModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            id: this.id,
            code: this.code,
            date: this.date,
            customer: this.customer.toJson(),
            description: this.description,
            deliveryDate: this.deliveryDate,
            laserProgram: this.laserProgram,
            sentForManufacturing: this.sentForManufacturing,
            externalDeliveries: this.externalDeliveries.map(x => x.toJson()),
            invoice: this.invoice.toJson()
        }
    }
}