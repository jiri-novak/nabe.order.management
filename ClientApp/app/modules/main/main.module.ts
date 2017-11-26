import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { NabeCommonModule } from '../common/common.module';

import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CompaniesService } from './services/companies.service';
import { SelectModule } from 'ng-select';

@NgModule({
    declarations: [
        NavMenuComponent,
        OrdersComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule,

        SelectModule,
        FlexLayoutModule,

        NabeCommonModule
    ],
    providers: [
        CompaniesService
    ],
    exports: [
         NavMenuComponent,
         OrdersComponent
    ]
})
export class NabeMainModule {
}
