import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from "ng2-breadcrumbs";
import { SelectModule } from 'ng-select';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BreadcrumbsModule,
        SelectModule,
        RouterModule.forRoot([
             { path: '', redirectTo: 'home', pathMatch: 'full' },
             { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
             { path: 'fetch-data', component: FetchDataComponent },
             { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
