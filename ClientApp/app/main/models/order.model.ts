export class OrderModel {
    id: string;
    code: number;

    isEdit: boolean;

    static fromServerResponse(response: any): OrderModel {
        if (!response)
            return null;

        var model = new OrderModel();

        model.id = response.id;
        model.code = response.code;

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
            code: this.code
        }
    }
}