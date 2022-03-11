import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveList } from 'src/app/models/view/active-filter.model';
import { BaseViewComponent, LoadingService } from 'rahav-angular';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent
  extends BaseViewComponent
  implements OnInit, OnDestroy {

  // <fields>

  activeList = ActiveList;

  // </fields>

  // <constructor>

  constructor(
    protected fb: FormBuilder,
    protected _modalService: NgbModal,
    protected _customerService: CustomerService,
    protected _loadingService: LoadingService,
    protected _ref: ChangeDetectorRef
  ) {
    super(_modalService, _customerService, _loadingService, _ref);
  }

  // </constructor>

  // <events>

  // </events>

  // <methods>

  override loadForm(): void {
    this.formFilter = this.fb.group({ id: [null], name: [null], active: [null] });
  }

  override fetchSanitize(filter: any): void {
    if (filter.active == 'null') {
      filter.active = null;
    }
  }

  // </methods>
}
