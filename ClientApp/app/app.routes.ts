import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { 
    NavMenuComponent, 
    ZakazkyComponent, 
    CustomersComponent,
    ObjednateleComponent,
    NastenkaComponent
} from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'nastenka', pathMatch: 'full' },
    { path: 'nastenka', component: NastenkaComponent },
    { path: 'zakazky', component: ZakazkyComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'objednatele', component: ObjednateleComponent },
    { path: '**', redirectTo: 'orders' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
