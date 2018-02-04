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

    create(customer: CustomerModel) : Observable<CustomerModel> {
        return this.httpClient.post<CustomerModel>(`${this.CUSTOMERS_URL}`, customer);
    }

    update(customer: CustomerModel) : Observable<CustomerModel> {
        return this.httpClient.put<CustomerModel>(`${this.CUSTOMERS_URL}/${customer.id}`, customer);
    }

    delete(customer: CustomerModel) : Observable<CustomerModel> {
        return this.httpClient.delete<CustomerModel>(`${this.CUSTOMERS_URL}/${customer.id}`);
    }
}