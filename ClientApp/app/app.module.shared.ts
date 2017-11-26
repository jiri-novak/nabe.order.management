// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BreadcrumbsModule } from "ng2-breadcrumbs";
import { SelectModule } from 'ng-select';
import { ToasterModule } from 'angular2-toaster'
import { BusyModule } from 'angular2-busy';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FontAwesomeModule} from 'ng2-font-awesome';

import { NabeMainModule } from './modules/main/main.module';

import { AppComponent } from './app.component';
import { RoutesConfig } from './app.routes';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RoutesConfig,

        ToasterModule,
        FlexLayoutModule,
        BusyModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        SelectModule,
        BreadcrumbsModule,

        NabeMainModule
    ]
})
export class AppModuleShared {
}
