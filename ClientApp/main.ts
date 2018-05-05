import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import '@angularclass/hmr'
import 'zone.js/dist/long-stack-trace-zone'

import { AppModule } from './app/app.module'

if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => modulePromise.then((appModule) => appModule.destroy()));
} else {
    enableProdMode();
}

const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);