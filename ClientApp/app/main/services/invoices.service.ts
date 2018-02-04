import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map'
import { InvoiceModel } from '../models/invoice.model';

@Injectable()
export class InvoicesService {
    private INVOICES_URL: string = `api/invoices`;

    constructor(private httpClient: HttpClient) {
    }

    getAll() : Observable<Array<InvoiceModel>> {
        return this.httpClient.get<Array<InvoiceModel>>(`${this.INVOICES_URL}`)
            .map(response => InvoiceModel.fromServerResponseArray(response));
    }

    update(invoice: InvoiceModel) : Observable<InvoiceModel> {
        return this.httpClient.put<InvoiceModel>(`${this.INVOICES_URL}/${invoice.id}`, invoice);
    }

    create(invoice: InvoiceModel) : Observable<InvoiceModel> {
        return this.httpClient.post<InvoiceModel>(`${this.INVOICES_URL}`, invoice);
    }

    delete(invoice: InvoiceModel) : Observable<InvoiceModel> {
        return this.httpClient.delete<InvoiceModel>(`${this.INVOICES_URL}/${invoice.id}`);
    }
}