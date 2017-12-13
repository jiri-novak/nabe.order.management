// @angular
import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { createNewHosts, removeNgStyles } from '@angularclass/hmr'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';

// third-party libraries
import { ToasterModule } from 'angular2-toaster'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AlertModule } from 'ngx-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

// infrastructure app
import { NabeMainModule } from './main'
import { AppComponent } from './app.component';
import { RoutesConfig } from './app.routes';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RoutesConfig,
        BrowserModule,
        BrowserAnimationsModule,
        AlertModule.forRoot(),

        Ng2SmartTableModule,
        ToasterModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

        NabeMainModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}
