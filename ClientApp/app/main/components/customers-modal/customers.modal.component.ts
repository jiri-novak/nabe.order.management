import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerModel } from '../../models/customer.model';
import { CompanyModel } from '../../models/company.model';

@Component({
    selector: 'customers-modal',
    templateUrl: './customers.modal.component.html',
    styleUrls: ['./customers.modal.component.scss']
})
export class CustomersModalComponent {
    companies: CompanyModel[];
    model: CustomerModel;
    submitted: boolean = false;

    constructor(public fb: FormBuilder, public bsModalRef: BsModalRef) {
        this.model = new CustomerModel();
    }

    onSubmit() {
        this.submitted = true;
        this.bsModalRef.hide();
    }

    compareCompaniesById(c1: CompanyModel, c2: CompanyModel) {
        return c1 != null && c2 != null && c1.id == c2.id;
    }
}