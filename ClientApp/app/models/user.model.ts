import { AddressModel } from './address.model'

export class CustomerModel {
    id: string;
    name: string;
    address: AddressModel;
    dic: string;
    ico: number;
}

export class UserModel {
    id: string;
    name: string;
    customer: CustomerModel
}

export class SortingModel {
    
      order: number;
      templateBid: string;
      nodeBid: string;
      parameterBid: string;
      index: number;
      location: string;
    
      constructor() {
        this.clear();
      }
    
      clear() {
        this.order = null;
        this.templateBid = null;
        this.nodeBid = null;
        this.parameterBid = null;
        this.index = null;
        this.location = null;
      }
    
      static fromServerResponse(response: any): SortingModel {
        var model = new SortingModel();
        if (response) {
          model.order = response.order;
          model.templateBid = response.templateBid;
          model.nodeBid = response.nodeBid;
          model.parameterBid = response.parameterBid;
          model.index = response.index;
          model.location = response.location;
        }
        return model;
      }
    
      static fromServerResponseArray(response: any): Array<SortingModel> {
        var models = new Array<SortingModel>();
        if (response) {
          models = response.map((value) => SortingModel.fromServerResponse(value));
        }
        return models;
      }
    
      toJson() {
        return {
          order: this.order,
          templateBid: this.templateBid,
          nodeBid: this.nodeBid,
          parameterBid: this.parameterBid,
          index: this.index,
          location: this.location
        }
      }
    }