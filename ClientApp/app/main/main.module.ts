import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { TableModule } from 'ngx-easy-table';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromPipes from './pipes';

const declarations = [
    fromPipes.TypToStringPipe,
    fromPipes.StavToStringPipe,

    fromComponents.NavMenuComponent,
    fromComponents.CustomersComponent,
    fromComponents.CustomersModalComponent,
    fromComponents.ObjednateleComponent,
    fromComponents.ObjednateleDetailComponent,
    fromComponents.ObjednateleModalComponent,
    fromComponents.NastenkaComponent,
    fromComponents.ZaznamyComponent
];

const providers = [
    fromServices.CompaniesService,
    fromServices.CustomersService,
    fromServices.OrdersService,
    fromServices.DialogService,
    fromServices.ZaznamyService
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
        BusyModule.forRoot(new BusyConfig({
            message: 'Načítám data...',
            backdrop: true,
            template: '<div class="spinner" style="width: 200px"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div> {{message}}</div>',
            delay: 200,
            minDuration: 1000,
            wrapperClass: 'text-center'
        })),
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
