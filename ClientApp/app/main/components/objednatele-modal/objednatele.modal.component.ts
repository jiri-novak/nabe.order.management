import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyModel } from '../../models/company.model';
import { AddressModel } from '../../models/address.model';

@Component({
    selector: 'objednatele-modal',
    templateUrl: './objednatele.modal.component.html',
    styleUrls: ['./objednatele.modal.component.scss']
})
export class ObjednateleModalComponent {
    model: CompanyModel;
    submitted: boolean = false;

    constructor(public fb: FormBuilder, public bsModalRef: BsModalRef) {
        this.model = new CompanyModel();
        this.model.address = new AddressModel();
    }

    onSubmit() {
        this.submitted = true;
        this.bsModalRef.hide();
    }
}