import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map'

import { CustomerModel } from '../models/customer.model';

@Injectable()
export class CustomersService {
    private CUSTOMERS_URL: string = `api/customers`;

    constructor(private httpClient: HttpClient) {
    }

    getAll(): Observable<Array<CustomerModel>> {
        return this.httpClient.get<Array<CustomerModel>>(`${this.CUSTOMERS_URL}`)
            .map(response => CustomerModel.fromServerResponseArray(response));
    }
}