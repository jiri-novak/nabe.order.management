import { ExternalDeliveryModel } from "./external.delivery.model";
import { CustomerModel } from "./customer.model";

export class ExternalDeliveryCustomerModel {
    externalDelivery: ExternalDeliveryModel;
    customer: CustomerModel;

    static fromServerResponse(response: any): ExternalDeliveryCustomerModel {
        if (!response)
            return null;

        var model = new ExternalDeliveryCustomerModel();

        model.externalDelivery = ExternalDeliveryModel.fromServerResponse(response.externalDelivery);
        model.customer = CustomerModel.fromServerResponse(response.customer);

        return model;
    }

    static fromServerResponseArray(response: any): Array<ExternalDeliveryCustomerModel> {        
        var models = new Array<ExternalDeliveryCustomerModel>();
        
        if (response) {
            models = response.map((value) => ExternalDeliveryCustomerModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            externalDelivery: this.externalDelivery.toJson(),
            customer: this.customer.toJson()
        }
    }
}