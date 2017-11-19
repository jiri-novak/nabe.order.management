import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { HttpService } from './../../common/services/http.service';

import { CompanyModel } from '../models/company.model';

@Injectable()
export class CompaniesService {
    private COMPANIES_URL: string = `api/companies`;

    constructor(private httpService: HttpService, private _http: Http) {
    }

    getAll(): Observable<Array<CompanyModel>> {
        return this.httpService.sendGet(`${this.COMPANIES_URL}`)
            .map(response => CompanyModel.fromServerResponseArray(response));
    }
}