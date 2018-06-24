import { AddressModel } from './address.model'

export class CompanyModel {
    id: string;
    name: string;
    address: AddressModel;
    dic: string;
    ico: number;

    constructor() {
        this.address = new AddressModel();
    }

    static fromServerResponse(response: any): CompanyModel {
        if (!response)
            return null;

        var model = new CompanyModel();

        model.id = response.id.toString();
        model.name = response.name;
        model.address = AddressModel.fromServerResponse(response.address);
        model.dic = response.dic;
        model.ico = response.ico;

        return model;
    }

    static fromServerResponseArray(response: any): Array<CompanyModel> {        
        var models = new Array<CompanyModel>();
        
        if (response) {
            models = response.map((value) => CompanyModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            id : this.id,
            name : this.name,
            address : this.address.toJson(),
            dic : this.dic,
            ico : this.ico
        }
    }
}