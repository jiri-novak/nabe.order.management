import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/company.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToasterService, Toast } from 'angular2-toaster';
import { DialogService } from '../../services/dialog.service';
import { ObjednateleModalComponent } from '../objednatele-modal/objednatele.modal.component';

@Component({
    selector: 'objednatele',
    templateUrl: './objednatele.component.html',
    styleUrls: ['./objednatele.component.scss']
})
export class ObjednateleComponent implements OnInit, OnDestroy {
    companies: CompanyModel[] = [];
    selectedRow: CompanyModel;
    bsModalRef: BsModalRef;
    busy: Subscription;
    //onModalHidden: Subscription;

    configuration: Config = {
        searchEnabled: false,
        headerEnabled: true,
        orderEnabled: true,
        globalSearchEnabled: false,
        paginationEnabled: true,
        paginationRangeEnabled: true,
        exportEnabled: false,
        clickEvent: true,
        selectRow: true,
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
        { key: 'name', title: 'Jméno', width: '20%' },
        { key: 'ico', title: 'IČO', width: '10%' },
        { key: 'dic', title: 'DIČ', width: '10%' },
        { key: 'address', title: 'Adresa', width: '70%' }
    ];

    constructor(
        private companiesService: CompaniesService,
        private modalService: BsModalService,
        private toasterService: ToasterService,
        private dialogService: DialogService) {
    }

    ngOnInit(): void {
        this.busy = this.companiesService.getAll().subscribe(result =>
            this.companies = result
        );

        // this.onModalHidden = this.modalService.onHidden.subscribe(() => {
        //     if (this.bsModalRef && this.bsModalRef.content.submitted) {
        //         this.createRow(this.bsModalRef.content.model);
        //     }
        // });
    }

    ngOnDestroy(): void {
        this.busy.unsubscribe();
        //this.onModalHidden.unsubscribe();
    }

    // openModal() {
    //     this.bsModalRef = this.modalService.show(ObjednateleModalComponent);
    // }

    async createRow(row: CompanyModel) {
        this.companiesService.create(row).toPromise().then(
            result => {
                let toast: Toast = { type: 'success', title: 'Objednatel úspěšně vytvořen' };
                this.toasterService.pop(toast);

                this.companies.push(result);
                this.companies = this.sortByName(this.companies);
                this.selectedRow = result;
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při vytváření objednatele: ${error.message}` };
                this.toasterService.pop(toast);
            }
        );
    }

    async updateRow(row: CompanyModel) {
        this.companiesService.update(row).toPromise().then(
            value => {
                let toast: Toast = { type: 'success', title: 'Objednatel úspěšně editován' };
                this.toasterService.pop(toast);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při editaci objednatele: ${error.message}` };
                this.toasterService.pop(toast);
            }
        );
    }

    async deleteRow(row: CompanyModel) {
        let result = await this.dialogService.confirm(`Opravdu smazat?`, `Opravdu si přejete smazat objednatele ${row.name}?`);

        if (!!result.dismiss) {
            return;
        }

        await this.companiesService.delete(row).toPromise().then(
            value => {
                let toast: Toast = { type: 'success', title: 'Objednatel úspěšně odstraněn' };
                this.companies = this.companies.filter(r => r.id != row.id);
                this.selectedRow = null;
                this.toasterService.pop(toast);
            },
            error => {
                let toast: Toast = { type: 'error', title: `Chyba při odstraňování objednatele: ${error.message}` };
                this.toasterService.pop(toast);
                this.selectedRow = null;
            }
        );
    }

    eventEmitted($event) {
        if ($event.event == "onClick") {
            let row: CompanyModel = $event.value.row;
            this.selectedRow = row;
        }
    }

    private sortByName(customers: Array<CompanyModel>): Array<CompanyModel> {
        return customers.sort((c1, c2) => {
            if (c1.name.toLowerCase() < c2.name.toLowerCase()) return -1;
            if (c1.name.toLowerCase() > c2.name.toLowerCase()) return 1;
            return 0;
        }).filter(() => true);
    }
}