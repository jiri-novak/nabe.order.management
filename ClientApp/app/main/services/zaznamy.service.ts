import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map'

import { ZaznamModel } from '../models';

@Injectable()
export class ZaznamyService {
    private URL: string = `api/zaznamy`;

    constructor(private httpClient: HttpClient) {
    }

    getAll() : Observable<Array<ZaznamModel>> {
        return this.httpClient.get<Array<ZaznamModel>>(`${this.URL}`)
            .map(response => ZaznamModel.fromServerResponseArray(response));
    }

    // update(order: OrderModel) : Observable<OrderModel> {
    //     return this.httpClient.put<OrderModel>(`${this.ORDERS_URL}/${order.id}`, order);
    // }

    // create(order: OrderModel) : Observable<OrderModel> {
    //     return this.httpClient.post<OrderModel>(`${this.ORDERS_URL}`, order);
    // }

    // delete(order: OrderModel) : Observable<OrderModel> {
    //     return this.httpClient.delete<OrderModel>(`${this.ORDERS_URL}/${order.id}`);
    // }
}