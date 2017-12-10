import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from "../../models/company.model";

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
    styleUrls: [ './orders.component.scss' ]
})
export class OrdersComponent implements OnInit {

    isLoading: boolean = false;
    companies: Array<CompanyModel> = new Array<CompanyModel>();

    constructor(private companiesService: CompaniesService) {
    }

    ngOnInit(): void {
        this.loadData();
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
