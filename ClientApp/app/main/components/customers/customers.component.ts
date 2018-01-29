import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { CustomersService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';
import { Observable } from 'rxjs/Observable';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/company.model';
import { ComboboxItem } from '../../models/combobox.item';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Toast } from 'angular2-toaster';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    modal: boolean = false;
    busy: Subscription;
    customers: CustomerModel[];
    companies: ComboboxItem[];
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

    constructor(
        private customersService: CustomersService,
        private companiesService: CompaniesService,
        private toasterService: ToasterService,
        private dialogService: DialogService) {
            this.backupRows = new Object();
    }

    ngOnInit(): void {
        this.busy = this.customersService.getAll().subscribe(result => this.customers = result);
        this.companiesService.getAll().subscribe(result => this.companies = result.map(x => { return new ComboboxItem(x.id, x.name) }));
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

    confirmRow(row: CustomerModel) {
        row.isEdit = false;
        this.backupRows[row.id] = null;

        this.customersService.update(row).subscribe(
            result => {
                let toast: Toast = { type: 'success', title: 'Zákazník úspěšně editován' };
                this.toasterService.pop(toast);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při editaci zázkazníka: ${error}` };
                this.toasterService.pop(toast);
            }
        );
    }

    deleteRow(row: CustomerModel) {
        this.dialogService.confirm(`Opravdu smazat?`, `Opravdu si přejete smazat zákazníka ${row.name}?`)
            .then(() => {
                this.customersService.delete(row).subscribe(
                    result => {
                        let toast: Toast = { type: 'success', title: 'Zákazník úspěšně odstraněn' };
                        this.customers = this.customers.filter(r => r.id != row.id);
                        this.toasterService.pop(toast);
                    },
                    error => {
                        let toast: Toast = { type: 'error', title: `Chyba při odstraňování zázkazníka: ${error}` };
                        this.toasterService.pop(toast);
                    }
                );
            },
            (dismiss) => { });
    }
}