import { CompanyModel } from './company.model'

export class CustomerModel {
    id: string;
    name: string;
    company: CompanyModel;
    isEdit: boolean;

    static fromServerResponse(response: any): CustomerModel {
        if (!response)
            return null;

        var model = new CustomerModel();

        model.name = response.name;
        model.id = response.id;
        model.company = CompanyModel.fromServerResponse(response.company);

        return model;
    }

    static fromServerResponseArray(response: any): Array<CustomerModel> {        
        var models = new Array<CustomerModel>();
        
        if (response) {
            models = response.map((value) => CustomerModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            company: this.company.toJson()
        }
    }
}