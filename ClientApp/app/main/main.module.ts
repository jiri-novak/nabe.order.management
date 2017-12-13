import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import * as fromComponents from './components';

import { CompaniesService } from './services/companies.service';

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
        Ng2SmartTableModule,
    ],
    exports: declarations,
    providers: [
        CompaniesService
    ]
})
export class NabeMainModule {
}
