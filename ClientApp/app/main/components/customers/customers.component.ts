import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { CustomersService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';
import { Observable } from 'rxjs/Observable';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/company.model';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    modal: boolean = false;
    busy: Subscription;
    customers: CustomerModel[];
    companies: any[];

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

    columns = [
        { key: 'name', title: 'Jméno' },
        { key: 'company', title: 'Společnost' },
        { key: '', title: '' }
    ];

    pagination = {
        limit: 20,
        offset: 0,
        count: null,
    };

    constructor(private customersService: CustomersService, private companiesService: CompaniesService) {
    }

    ngOnInit(): void {
        this.busy = this.customersService.getAll().subscribe(result => this.customers = result);
        this.companiesService.getAll().subscribe(result => this.companies = result.map(x => { return { value: x.id, label: x.name } }));
    }

    editRow(row: CustomerModel) {
        row.isEdit = true;
    }

    confirmRow(row: CustomerModel) {
        row.isEdit = false;
    }

    deleteRow(row: CustomerModel) {
    }
}