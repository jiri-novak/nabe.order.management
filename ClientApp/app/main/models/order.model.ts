import { CustomerModel } from "./customer.model";

export class OrderModel {
    id: string;
    code: number;
    date: Date;
    customer: CustomerModel;
    description: string;
    deliveryDate: Date;

    isEdit: boolean;
    isExpanded: boolean;

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
            deliveryDate: this.deliveryDate
        }
    }
}