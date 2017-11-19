import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { NavMenuComponent } from './modules/main/components/navmenu/navmenu.component';
import { OrdersComponent } from './modules/main/components/orders/orders.component';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' } },
    { path: '**', redirectTo: 'orders' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
