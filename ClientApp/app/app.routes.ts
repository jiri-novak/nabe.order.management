import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { 
    NavMenuComponent, 
    OrdersComponent, 
    CustomersComponent,
    CompaniesComponent
} from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: '**', redirectTo: 'orders' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
