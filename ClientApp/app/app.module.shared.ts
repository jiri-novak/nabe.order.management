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

        SelectModule,
        BreadcrumbsModule,

        NabeMainModule
    ]
})
export class AppModuleShared {
}
