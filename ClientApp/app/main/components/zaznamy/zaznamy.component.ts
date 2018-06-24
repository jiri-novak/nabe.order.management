import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ZaznamyService } from '../../services';
import { ZaznamModel } from '../../models';

@Component({
    selector: 'zaznamy',
    templateUrl: './zaznamy.component.html',
    styleUrls: ['./zaznamy.component.scss']
})
export class ZaznamyComponent implements OnInit, OnDestroy {
    @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;

    zaznamy: Array<ZaznamModel> = new Array<ZaznamModel>();
    bsModalRef: BsModalRef;
    busy: Subscription;
    selectedRow: ZaznamModel;

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
        { key: 'typ', title: 'Typ', width: '10%' },
        { key: 'stav', title: 'Stav', width: '10%' },
        { key: 'cislo', title: 'Číslo', width: '10%' },
        { key: 'datum', title: 'Datum', width: '10%' },
        { key: 'jmeno', title: 'Jméno', width: '10%' },
        { key: 'objednatelJmeno', title: 'Objednatel', width: '10%' },
        { key: 'popis', title: 'Popis', width: '20%' },
        { key: 'poznamka', title: 'Poznámka', width: '20%' },
    ];

    constructor(
        private zaznamyService: ZaznamyService) {
    }

    ngOnInit(): void {
        this.busy = this.zaznamyService.getAll().subscribe(result => {
            this.zaznamy = result;
        });
    }

    ngOnDestroy(): void {
        this.busy.unsubscribe();
    }

    eventEmitted($event) {
        if ($event.event == "onClick") {
            let row : ZaznamModel = $event.value.row;
            this.selectedRow = row;
        }
    }
}
