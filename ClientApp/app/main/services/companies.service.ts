import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map'

import { CompanyModel } from '../models/company.model';

@Injectable()
export class CompaniesService {
    private COMPANIES_URL: string = `api/companies`;

    constructor(private httpClient: HttpClient) {
    }

    getAll() : Observable<Array<CompanyModel>> {
        return this.httpClient.get<Array<CompanyModel>>(`${this.COMPANIES_URL}`)
            .map(response => CompanyModel.fromServerResponseArray(response));
    }

    update(company: CompanyModel) : Observable<CompanyModel> {
        return this.httpClient.put<CompanyModel>(`${this.COMPANIES_URL}/${company.id}`, company);
    }

    create(customer: CompanyModel) : Observable<CompanyModel> {
        return this.httpClient.post<CompanyModel>(`${this.COMPANIES_URL}`, customer);
    }

    delete(customer: CompanyModel) : Observable<CompanyModel> {
        return this.httpClient.delete<CompanyModel>(`${this.COMPANIES_URL}/${customer.id}`);
    }
}