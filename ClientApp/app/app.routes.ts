import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { NavMenuComponent } from './main/components/navmenu/navmenu.component';
import { OrdersComponent } from './main/components/orders/orders.component';
import { CustomersComponent } from './main/components/customers/customers.component';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'customers', component: CustomersComponent },
    { path: '**', redirectTo: 'orders' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
