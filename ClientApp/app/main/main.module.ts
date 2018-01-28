import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CompaniesService } from './services/companies.service';
import { TableModule } from 'ngx-easy-table';
import { BusyModule } from 'angular2-busy';

import * as fromComponents from './components';
import { CustomersService } from './services/customer.service';
import { SelectModule } from 'ng-select';

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
        SelectModule
    ],
    exports: declarations,
    providers: [
        CompaniesService,
        CustomersService
    ]
})
export class NabeMainModule {
}
