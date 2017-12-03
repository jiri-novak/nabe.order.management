import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster'
import { Observable } from 'rxjs/Observable'

import '../assets/sass/app.scss'

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public readonly toasterconfig = new ToasterConfig({
        positionClass: 'toast-bottom-left',
    })

    public constructor() {

    }
}
