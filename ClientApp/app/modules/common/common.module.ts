import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap'
import { BusyModule } from 'angular2-busy';

import { HttpService } from './services/http.service';
import { SelectionBoxComponent } from './components/selection-box/selection-box.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BusyModule,
  ],
  declarations: [
    SelectionBoxComponent
  ],
  providers: [
    HttpService
  ],
  exports: [
    SelectionBoxComponent
  ]
})
export class NabeCommonModule { }