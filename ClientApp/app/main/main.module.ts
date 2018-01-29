import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CompaniesService } from './services/companies.service';
import { TableModule } from 'ngx-easy-table';
import { BusyModule } from 'angular2-busy';
import { ModalModule } from 'ngx-bootstrap/modal';

import * as fromComponents from './components';
import { CustomersService } from './services/customer.service';
import { SelectModule } from 'ng-select';
import { DialogService } from './services/dialog.service';

const declarations = [
    fromComponents.NavMenuComponent,
    fromComponents.InvoicesComponent,
    //fromComponents.InvoicesDialogComponent,
    fromComponents.CustomersComponent,
    fromComponents.CompaniesComponent
];

@NgModule({
    declarations,
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule,

        FlexLayoutModule,
        TableModule,
        BusyModule,
        SelectModule,
        ModalModule.forRoot()
    ],
    exports: declarations,
    providers: [
        CompaniesService,
        CustomersService,
        DialogService
    ]
})
export class NabeMainModule {
}
