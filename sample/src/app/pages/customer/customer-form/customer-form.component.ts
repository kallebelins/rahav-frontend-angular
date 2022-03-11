import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent, LoadingService } from 'rahav-angular';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {

  // <fields>

  // </fields>

  // <constructor>

  constructor(
    protected fb: FormBuilder,
    public _route: ActivatedRoute,
    public _router: Router,
    protected _customerService: CustomerService,
    public _loadingService: LoadingService,
    public _ref: ChangeDetectorRef
  ) {
    super(_route, _router, _customerService, _loadingService, _ref);
  }

  // </constructor>

  // <events>

  // </events>

  // <methods>

  override loadForm(): void {
    this.formGroup = this.fb.group({
      name: [{
        value: null,
        disabled: this.isView
      }, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      active: [{
        value: true,
        disabled: this.isView
      }, Validators.compose([Validators.required])],
    });
  }

  override patchForm(): void {
    this.formGroup?.patchValue(this.model);
  }

  override actionSuccess(): void {
    this.router.navigate(['/customer']);
  }

  // </methods>

}
