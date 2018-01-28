import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { 
    NavMenuComponent, 
    InvoicesComponent, 
    CustomersComponent,
    CompaniesComponent
} from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'invoices', component: InvoicesComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: '**', redirectTo: 'invoices' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
