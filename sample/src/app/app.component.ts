import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from 'rahav-angular';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'customer-app';

  loading = false;
  private subscribes: Subscription[] = [];

  constructor(
    protected loadingService: LoadingService,
    protected ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    const loadingSubscription = this.loadingService.loadingSub
      .pipe(delay(0)) 
      .subscribe((loading) => {
        this.loading = loading;
        this.ref.detectChanges();
      });
    this.subscribes.push(loadingSubscription);
  }

  ngOnDestroy() {
    this.subscribes.forEach((sb) => sb.unsubscribe());
  }
}
