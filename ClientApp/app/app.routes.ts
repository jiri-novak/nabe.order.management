import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { NavMenuComponent } from './main/components/navmenu/navmenu.component';
import { CustomersComponent } from './main/components/customers/customers.component';
import { InvoicesComponent } from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'invoices', component: InvoicesComponent },
    { path: 'customers', component: CustomersComponent },
    { path: '**', redirectTo: 'invoices' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
