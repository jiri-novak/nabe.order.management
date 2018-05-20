import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CompaniesService } from './services/companies.service';
import { TableModule } from 'ngx-easy-table';
import { BusyModule } from 'angular2-busy';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import * as fromComponents from './components';
import * as fromServices from './services';

const declarations = [
    fromComponents.NavMenuComponent,
    fromComponents.ZakazkyComponent,
    fromComponents.CustomersComponent,
    fromComponents.CustomersModalComponent,
    fromComponents.ObjednateleComponent,
    fromComponents.ObjednateleModalComponent,
    fromComponents.NastenkaComponent
];

const providers = [
    fromServices.CompaniesService,
    fromServices.CustomersService,
    fromServices.OrdersService,
    fromServices.DialogService
];

@NgModule({
    declarations,
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        TableModule,
        BusyModule,
        ModalModule.forRoot(),
        CollapseModule.forRoot()
    ],
    exports: declarations,
    providers: providers,
    entryComponents: [
        fromComponents.CustomersModalComponent,
        fromComponents.ObjednateleModalComponent
    ]
})
export class NabeMainModule {
}
