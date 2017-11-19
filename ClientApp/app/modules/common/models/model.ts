export interface IModel {
    fromServerResponse(response: any): IModel;
    fromServerResponseArray(response: any): Array<IModel>;
  }