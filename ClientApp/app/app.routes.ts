import { RouterModule, Routes } from '@angular/router';

import * as components from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'nastenka', pathMatch: 'full' },
    { path: 'nastenka', component: components.NastenkaComponent },
    { path: 'zaznamy', component: components.ZaznamyComponent },
    { path: 'objednatele', component: components.ObjednateleComponent },
    { path: '**', redirectTo: 'orders' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
