import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { CustomersService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';
import { Observable } from 'rxjs/Observable';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/company.model';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Toast } from 'angular2-toaster';
import { DialogService } from '../../services/dialog.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CustomersModalComponent } from '../customers-modal/customers.modal.component'

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
    customers: CustomerModel[];
    companies: CompanyModel[];
    bsModalRef: BsModalRef;
    subscriptions: Array<Subscription> = new Array<Subscription>();
    busy: Subscription;
    backupRows: Object;

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
        collapseAllRows: false,
        fixedColumnWidth: false,
        horizontalScroll: false,
        resizeColumn: true,
        tableLayout: {
            style: 'normal',
            theme: 'normal',
            borderless: false,
            hover: true,
            striped: true
        }
    };

    columns = [
        { key: '', title: '' },
        { key: 'name', title: 'Jméno' },
        { key: 'company', title: 'Společnost' }
    ];

    constructor(
        private customersService: CustomersService,
        private companiesService: CompaniesService,
        private toasterService: ToasterService,
        private dialogService: DialogService,
        private modalService: BsModalService) {
        this.backupRows = new Object();
    }

    ngOnInit(): void {
        this.busy = this.customersService.getAll().subscribe(result => 
            this.customers = result
        );

        this.subscriptions.push(this.companiesService.getAll().subscribe(result => 
            this.companies = result
        ));

        this.subscriptions.push(this.modalService.onHidden.subscribe(() => {
            if (this.bsModalRef && this.bsModalRef.content.submitted) {
                this.createRow(this.bsModalRef.content.model);
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.busy.unsubscribe();
    }

    openModal() {
        this.bsModalRef = this.modalService.show(CustomersModalComponent);
        this.bsModalRef.content.companies = this.companies;
    }

    editRow(row: CustomerModel) {
        this.backupRows[row.id] = _.cloneDeep(row);
        row.isEdit = true;
    }

    cancelEditRow(row: CustomerModel) {
        _.merge(row, this.backupRows[row.id]);
        row.isEdit = false;
        this.backupRows[row.id] = null;
    }

    createRow(row: CustomerModel) {
        row.isEdit = false;
        this.backupRows[row.id] = null;

        this.customersService.create(row).subscribe(
            result => {
                let toast: Toast = { type: 'success', title: 'Dodavatel úspěšně vytvořen' };
                this.toasterService.pop(toast);

                this.customers.push(result);
                this.customers = this.sortByName(this.customers);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při vytváření dodavatele: ${error.message}` };
                this.toasterService.pop(toast);
            }
        );
    }

    confirmRow(row: CustomerModel) {
        row.isEdit = false;
        this.backupRows[row.id] = null;

        this.customersService.update(row).subscribe(
            result => {
                let toast: Toast = { type: 'success', title: 'Dodavatel úspěšně editován' };
                this.toasterService.pop(toast);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při editaci dodavatele: ${error.message}` };
                this.toasterService.pop(toast);
            }
        );
    }

    deleteRow(row: CustomerModel) {
        this.dialogService.confirm(`Opravdu smazat?`, `Opravdu si přejete smazat dodavatele ${row.name}?`)
            .then(() => {
                this.customersService.delete(row).subscribe(
                    result => {
                        let toast: Toast = { type: 'success', title: 'Dodavatel úspěšně odstraněn' };
                        this.customers = this.customers.filter(r => r.id != row.id);
                        this.toasterService.pop(toast);
                    },
                    error => {
                        let toast: Toast = { type: 'error', title: `Chyba při odstraňování dodavatele: ${error.message}` };
                        this.toasterService.pop(toast);
                    }
                );
            },
            (dismiss) => { });
    }

    compareCompaniesById(c1: CompanyModel, c2: CompanyModel) {
        return c1 != null && c2 != null && c1.id == c2.id;
    }

    private sortByName(customers: Array<CustomerModel>) : Array<CustomerModel> {
        return customers.sort((c1, c2) => {
             if (c1.name.toLowerCase() < c2.name.toLowerCase()) return -1;
             if (c1.name.toLowerCase() > c2.name.toLowerCase()) return 1;
             return 0;
        }).filter(r => true);
    }
}