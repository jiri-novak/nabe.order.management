import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { CustomersService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    modal: boolean = false;
    busy: Subscription;
    data: CustomerModel[];

    configuration: Config = {
        searchEnabled: false,
        headerEnabled: true,
        orderEnabled: true,
        globalSearchEnabled: false,
        paginationEnabled: true,
        exportEnabled: false,
        clickEvent: false,
        selectRow: false,
        selectCol: false,
        selectCell: false,
        rows: 50,
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

    constructor(private customersService: CustomersService) {
    }

    ngOnInit(): void {
        this.busy = this.customersService.getAll().subscribe(result => this.data = result);
    }

    // showModal() {
    //     this.modal = true;
    //     console.log('show');
    // }

    // hideModal() {
    //     this.modal = false;
    // }
}
