import { Component } from '@angular/core';

import { CompaniesService } from '../../services/companies.service';

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent {
    constructor(private companiesService: CompaniesService) {
    }
}
