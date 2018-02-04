import { State } from "./enums.model";
import { ExternalDeliveryCustomerModel } from "./external.delivery.customer.model";

export class ExternalDeliveryModel {
    id: string;
    description: string;
    comments: string;
    state: State;
    customers: Array<ExternalDeliveryCustomerModel> = [];

    static fromServerResponse(response: any): ExternalDeliveryModel {
        if (!response)
            return null;

        var model = new ExternalDeliveryModel();

        model.id = response.id;
        model.description = response.description;
        model.comments = response.comments;
        model.state = response.state;
        model.customers = ExternalDeliveryCustomerModel.fromServerResponseArray(response.customers);

        return model;
    }

    static fromServerResponseArray(response: any): Array<ExternalDeliveryModel> {        
        var models = new Array<ExternalDeliveryModel>();
        
        if (response) {
            models = response.map((value) => ExternalDeliveryModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            id: this.id,
            description: this.description,
            comments: this.comments,
            state: this.state,
            customers: this.customers.map(x => x.toJson())
        }
    }
}