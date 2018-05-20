import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from "../../models/company.model";

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { OrdersService } from '../../services/orders.service';
import { OrderModel } from '../../models/order.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from '../../services/dialog.service';
import { CustomersService } from '../../services/customer.service';

@Component({
    selector: 'zakazky',
    templateUrl: './zakazky.component.html',
    styleUrls: ['./zakazky.component.scss']
})
export class ZakazkyComponent implements OnInit, OnDestroy {
    orders: Array<OrderModel> = new Array<OrderModel>();
    bsModalRef: BsModalRef;
    subscriptions: Array<Subscription> = new Array<Subscription>();
    busy: Subscription;
    selectedRow: OrderModel;

    configuration: Config = {
        searchEnabled: false,
        headerEnabled: true,
        orderEnabled: true,
        globalSearchEnabled: false,
        paginationEnabled: true,
        paginationRangeEnabled: true,
        exportEnabled: false,
        clickEvent: true,
        selectRow: false,
        selectCol: false,
        selectCell: false,
        rows: 20,
        additionalActions: false,
        serverPagination: false,
        isLoading: false,
        detailsTemplate: false,
        groupRows: false,
        checkboxes: false,
        collapseAllRows: false
    };

    columns = [
        { key: 'date', title: 'Datum' },
        { key: 'code', title: 'Objednávka č.' },
        { key: 'customer.name', title: 'Jméno' },
        { key: 'description', title: 'Popis' },
        { key: 'deliveryDate', title: 'Termín dodání' },
        { key: '', title: 'Faktura' },
        { key: '', title: 'Faktura - odeslání' },
        { key: '', title: 'Dodací listy' }
    ];

    pagination = {
        limit: 20,
        offset: 0,
        count: null,
    };

    constructor(
        private ordersService: OrdersService,
        private customersService: CustomersService,
        private toasterService: ToasterService,
        private dialogService: DialogService,
        private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.busy = this.ordersService.getAll().subscribe(result => {
            this.orders = result;
            console.log(result[0]);
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.busy.unsubscribe();
    }

    eventEmitted($event) {
        if ($event.event == "onClick") {
            let row : OrderModel = $event.value.row;
            this.selectedRow = row;
        }
    }
}
