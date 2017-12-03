import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { NavMenuComponent } from './main/components/navmenu/navmenu.component';
import { OrdersComponent } from './main/components/orders/orders.component';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Seznam zakázek' } },
    { path: '**', redirectTo: 'orders' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
