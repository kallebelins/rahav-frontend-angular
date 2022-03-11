import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RahavAngularModule } from 'rahav-angular';


@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerViewComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RahavAngularModule
  ]
})
export class CustomerModule { }
