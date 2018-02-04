export class BillOfDeliveryModel {
    id: string;
    code: string;

    static fromServerResponse(response: any): BillOfDeliveryModel {
        if (!response)
            return null;

        var model = new BillOfDeliveryModel();

        model.id = response.id;
        model.code = response.code;

        return model;
    }

    static fromServerResponseArray(response: any): Array<BillOfDeliveryModel> {        
        var models = new Array<BillOfDeliveryModel>();
        
        if (response) {
            models = response.map((value) => BillOfDeliveryModel.fromServerResponse(value));
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