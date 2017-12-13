import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from "../../models/company.model";

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    isLoading: boolean = false;
    companies: Array<CompanyModel> = new Array<CompanyModel>();

    settings = {
        actions: {
            columnTitle: ''
        },
        add: {
            addButtonContent: '<span class="glyphicon glyphicon-plus">',
            createButtonContent: '<span class="glyphicon glyphicon-plus">',
            cancelButtonContent: '<span class="glyphicon glyphicon-remove">'
        },
        delete: {
            deleteButtonContent: '<span class="glyphicon glyphicon-trash">'
        },
        edit: {
            editButtonContent: '<span class="glyphicon glyphicon-edit">',
            saveButtonContent: '<span class="glyphicon glyphicon-save">',
            cancelButtonContent: '<span class="glyphicon glyphicon-remove">'
        },
        noDataMessage: 'Žádná data',
        columns: {
            id: {
                title: 'Id'
            },
            name: {
                title: 'Jméno'
            }
        }
    };

    constructor(private companiesService: CompaniesService) {
    }

    ngOnInit(): void {
        //this.loadData();
    }

    private loadData() {
        try {
            this.isLoading = true;
            this.companiesService.getAll().subscribe(result => this.companies = result);
        } finally {
            this.isLoading = false;
        }
    }
}
