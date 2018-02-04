export class InvoiceModel {
    id: string;
    code: number;

    isEdit: boolean;

    static fromServerResponse(response: any): InvoiceModel {
        if (!response)
            return null;

        var model = new InvoiceModel();

        model.id = response.id;
        model.code = response.code;

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
            code: this.code
        }
    }
}