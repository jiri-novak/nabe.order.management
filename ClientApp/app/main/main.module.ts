import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CompaniesService } from './services/companies.service';
import { TableModule } from 'ngx-easy-table';
import { BusyModule } from 'angular2-busy';
import { ModalModule } from 'ngx-bootstrap/modal';

import * as fromComponents from './components';
import { CustomersService } from './services/customer.service';
import { DialogService } from './services/dialog.service';

const declarations = [
    fromComponents.NavMenuComponent,
    fromComponents.InvoicesComponent,
    fromComponents.CustomersComponent,
    fromComponents.CustomersModalComponent,
    fromComponents.CompaniesComponent,
    fromComponents.CompaniesModalComponent
];

@NgModule({
    declarations,
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        FlexLayoutModule,
        TableModule,
        BusyModule,
        ModalModule.forRoot()
    ],
    exports: declarations,
    providers: [
        CompaniesService,
        CustomersService,
        DialogService
    ],
    entryComponents: [
        fromComponents.CustomersModalComponent,
        fromComponents.CompaniesModalComponent
    ]
})
export class NabeMainModule {
}
