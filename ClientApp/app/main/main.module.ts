import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import * as fromComponents from './components';

import { CompaniesService } from './services/companies.service';
import { TableModule } from 'ngx-easy-table';

const declarations = [
    fromComponents.NavMenuComponent,
    fromComponents.OrdersComponent,
    fromComponents.CustomersComponent
    //fromComponents.OrdersDialogComponent
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
    ],
    exports: declarations,
    providers: [
        CompaniesService
    ]
})
export class NabeMainModule {
}
