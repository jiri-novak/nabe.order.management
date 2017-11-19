import { IModel } from './model';
import { ClassConstructor } from "./class.constructor";

export enum HttpMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3
}

export class HttpModel<T extends IModel | Array<IModel>> {
    constructor(public ok: boolean, public data: T, public modelState: Array<ModelState>) {
    }
}

export class ModelState {
    key: string;
    messages: string[];

    constructor() {
        this.clear();
    }

    clear() {
        this.key = null;
        this.messages = [];
    }

    static fromServerResponse(response: any): Array<ModelState> {
        let models = new Array<ModelState>();
        for (let property in response) {
            let model = new ModelState();
            model.key = property;
            model.messages = response[property];
            models.push(model);
        }
        return models;
    }
}