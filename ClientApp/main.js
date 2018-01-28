import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angularclass/hmr';
import 'zone.js/dist/long-stack-trace-zone';
import { AppModule } from './app/app.module';
if (module.hot) {
    module.hot.accept();
}
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'production') {
    enableProdMode();
}
// Error.stackTraceLimit = Infinity
platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map