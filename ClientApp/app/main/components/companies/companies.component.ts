import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { Observable } from 'rxjs/Observable';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/company.model';
import { CustomerModel } from '../../models/customer.model';

@Component({
    selector: 'companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

    modal: boolean = false;
    busy: Subscription;
    companies: CompanyModel[];

    configuration: Config = {
        searchEnabled: false,
        headerEnabled: true,
        orderEnabled: true,
        globalSearchEnabled: false,
        paginationEnabled: true,
        paginationRangeEnabled: true,
        exportEnabled: false,
        clickEvent: false,
        selectRow: false,
        selectCol: false,
        selectCell: false,
        rows: 20,
        additionalActions: false,
        serverPagination: false,
        isLoading: false,
        detailsTemplate: true,
        groupRows: false
    };

    pagination = {
        limit: 20,
        offset: 0,
        count: null,
    };

    columns = [
        { key: 'name', title: 'Jméno' },
        { key: 'address.street', title: 'Ulice' },
        { key: 'address.streetNumber', title: 'Č.p.' },
        { key: 'address.zipCode', title: 'PSČ' },
        { key: 'address.municipality', title: 'Obec' },
        { key: 'address.state', title: 'Stát' },
        { key: 'dic', title: 'DIČ' },
        { key: 'ico', title: 'IČO' },
        { key: '', title: '' }
    ];

    constructor(private companiesService: CompaniesService) {
    }

    ngOnInit(): void {
        this.busy = this.companiesService.getAll().subscribe(result => this.companies = result);
    }

    editRow(row: CompanyModel) {
        row.isEdit = true;
    }

    confirmRow(row: CompanyModel) {
        row.isEdit = false;
    }

    deleteRow(row: CompanyModel) {
    }
}