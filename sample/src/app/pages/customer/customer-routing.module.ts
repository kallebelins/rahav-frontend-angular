import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';

const routes: Routes = [
  { path: '', component: CustomerViewComponent },
  { path: 'create', component: CustomerFormComponent },
  { path: ':id/view', component: CustomerFormComponent },
  { path: ':id/update', component: CustomerFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
