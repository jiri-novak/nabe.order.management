import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CompanyModel } from '../../models/company.model';
import * as _ from 'lodash';

@Component({
    selector: 'objednatele-detail',
    templateUrl: './objednatele.detail.component.html',
    styleUrls: ['./objednatele.detail.component.scss']
})
export class ObjednateleDetailComponent {
    @Input() model: CompanyModel = new CompanyModel();

    @Output() onCreate: EventEmitter<CompanyModel> = new EventEmitter<CompanyModel>();
    @Output() onUpdate: EventEmitter<CompanyModel> = new EventEmitter<CompanyModel>();
    @Output() onDelete: EventEmitter<CompanyModel> = new EventEmitter<CompanyModel>();

    isEdit: boolean;

    private backup: CompanyModel;

    createNew() {
        this.model = new CompanyModel();
        this.startEditing();
    }

    startEditing() {
        this.backup = _.cloneDeep(this.model);
        this.isEdit = true;
    }

    cancelEditing() {
        let wasNew = !this.model.id;

        this.model = this.backup;
        this.isEdit = false;
        this.backup = null;

        if (wasNew) {
            this.model = null;
        }
    }

    createOrUpdate() {
        if (this.model.id == null) {
            this.onCreate.emit(this.model);
        } else {
            this.onUpdate.emit(this.model);
        }

        this.isEdit = false;
        this.backup = null;
    }

    delete() {
        this.onDelete.emit(this.model);
        this.backup = null;
    }
}