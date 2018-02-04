import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { Observable } from 'rxjs/Observable';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/company.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToasterService, Toast } from 'angular2-toaster';
import { DialogService } from '../../services/dialog.service';
import { CompaniesModalComponent } from '../companies-modal/companies.modal.component';
import * as _ from 'lodash';

@Component({
    selector: 'companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {
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

    constructor(
        private companiesService: CompaniesService,
        private modalService: BsModalService,
        private toasterService: ToasterService,
        private dialogService: DialogService, ) {
        this.backupRows = new Object();
    }

    ngOnInit(): void {
        this.busy = this.companiesService.getAll().subscribe(result => 
            this.companies = result
        );

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
        this.bsModalRef = this.modalService.show(CompaniesModalComponent);
    }

    editRow(row: CompanyModel) {
        this.backupRows[row.id] = _.cloneDeep(row);
        row.isEdit = true;
    }

    cancelEditRow(row: CompanyModel) {
        _.merge(row, this.backupRows[row.id]);
        row.isEdit = false;
        this.backupRows[row.id] = null;
    }

    createRow(row: CompanyModel) {
        row.isEdit = false;
        this.backupRows[row.id] = null;

        this.companiesService.create(row).subscribe(
            result => {
                let toast: Toast = { type: 'success', title: 'Firma úspěšně vytvořena' };
                this.toasterService.pop(toast);

                this.companies.push(result);
                this.companies = this.sortByName(this.companies);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při vytváření firmy: ${error.message}` };
                this.toasterService.pop(toast);
            }
        );
    }

    confirmRow(row: CompanyModel) {
        row.isEdit = false;
        this.backupRows[row.id] = null;

        this.companiesService.update(row).subscribe(
            result => {
                let toast: Toast = { type: 'success', title: 'Firma úspěšně editována' };
                this.toasterService.pop(toast);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při editaci firmy: ${error.message}` };
                this.toasterService.pop(toast);
            }
        );
    }

    deleteRow(row: CompanyModel) {
        this.dialogService.confirm(`Opravdu smazat?`, `Opravdu si přejete smazat firmu ${row.name}?`)
            .then(() => {
                this.companiesService.delete(row).subscribe(
                    result => {
                        let toast: Toast = { type: 'success', title: 'Firma úspěšně odstraněna' };
                        this.companies = this.companies.filter(r => r.id != row.id);
                        this.toasterService.pop(toast);
                    },
                    error => {
                        let toast: Toast = { type: 'error', title: `Chyba při odstraňování firmy: ${error.message}` };
                        this.toasterService.pop(toast);
                    }
                );
            },
            (dismiss) => { });
    }

    private sortByName(customers: Array<CompanyModel>) : Array<CompanyModel> {
        return customers.sort((c1, c2) => {
             if (c1.name.toLowerCase() < c2.name.toLowerCase()) return -1;
             if (c1.name.toLowerCase() > c2.name.toLowerCase()) return 1;
             return 0;
        }).filter(r => true);
    }
}