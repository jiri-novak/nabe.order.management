import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'orders-dialog',
    templateUrl : './orders.dialog.component.html'
  })
  export class OrdersDialogComponent {
    complexForm : FormGroup;
  
    constructor(fb: FormBuilder){
      this.complexForm = fb.group({
        'firstName' : '',
        'lastName': '',
        'gender' : 'Female',
        'hiking' : false,
        'running' : false,
        'swimming' : false
      })
    }
  
    submitForm(value: any):void{
      console.log('Reactive Form Data: ')
      console.log(value);
    }
  }