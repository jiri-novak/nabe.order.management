import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';

import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from "../../models/company.model";

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
    styleUrls: [ './orders.component.css' ]
})
export class OrdersComponent implements OnInit {

    // subscriptions: Array<Subscription> = new Array<Subscription>();
    // timeoutMiliseconds: number = 500;
    // timeout: any;
    isLoading: boolean = false;
    companies: Array<CompanyModel> = new Array<CompanyModel>();

    constructor(private companiesService: CompaniesService) {
    }

    ngOnInit(): void {
        try {
            this.isLoading = true;
            this.companiesService.getAll().subscribe(result => this.companies = result);
        } finally {
            this.isLoading = false;
        }

        // // Handle loading nodes
        // self.subscriptions.push(self.node$.subscribe(node => {
        //     // self.activeNode = node;
        //     // if (self.componentScroll) self.componentScroll.directiveRef.update();

        //     self.isLoading = true;
        //     self.activeNode = new HierarchyNodeModel();
        //     if (this.timeout) {
        //         clearTimeout(this.timeout);
        //     }
        //     this.timeout = setTimeout(() => {
        //         self.isLoading = false;
        //         self.activeNode = node;
        //         self.classificationOptions =
        //             self.referenceService.classificationOptions
        //                 .filter(classi =>
        //                     (self.activeNode.specificClassification.flags === SpecificClassification.All) ||
        //                     (self.activeNode.specificClassification.flags !== SpecificClassification.All && self.activeNode.specificClassification.is(classi.specificClassification)))
        //                 .map(x => { return { value: x.shortName, label: x.shortName.toUpperCase() } });
        //         if (self.componentScroll) self.componentScroll.directiveRef.update();
        //     }, this.timeoutMiliseconds);
        // }));

        // // Handle operations on top menu
        // self.subscriptions.push(self.operationService.operation$.subscribe(operation => {
        //     switch (operation.action) {
        //         case OperationService.ADD_TEMPLATE:
        //             self.activeNode.addTemplate(operation.data);
        //             HierarchyNodeModel.initTemplatesInDeep(...self.activeNode.children);
        //             HierarchyNodeModel.validateDuplicationInDeep(...self.activeNode.children);
        //             break;
        //         case OperationService.DELETE_TEMPLATE:
        //             self.activeNode.deleteTemplate(operation.data);
        //             HierarchyNodeModel.initTemplatesInDeep(...self.activeNode.children);
        //             HierarchyNodeModel.validateDuplicationInDeep(...self.activeNode.children);
        //             break;
        //     }
        // }));
    }

    ngOnDestroy() {
        //this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
