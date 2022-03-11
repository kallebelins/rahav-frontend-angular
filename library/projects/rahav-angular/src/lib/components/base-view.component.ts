import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, Subscription } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { PaggingCriteriaModel, PAGGING_CRITERIA_DEFAULT } from '../models/logic/pagging-criteria.model';
import { FormGroup } from '@angular/forms';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';
import { PaginatorState } from '../models/view/paginator.model';
import { LoadingService } from '../services/loading.service';
import { PaggingResultModel } from '../models/logic/pagging-result.model';
import { SortState } from '../models/view/sort.model';

@Component({
    selector: 'app-base-view',
    template: ''
})
export abstract class BaseViewComponent
    implements OnInit, OnDestroy {

    // <fields>

    private _data$ = new BehaviorSubject<any[]>([]);

    isLoading: boolean = false;
    paginator = new PaginatorState();
    sorting = new SortState();
    formFilter!: FormGroup;
    pagging: PaggingCriteriaModel = PAGGING_CRITERIA_DEFAULT;
    subscriptions: Subscription[] = [];

    // </fields> 

    // <properties>

    get data$() {
        return this._data$.asObservable();
    }

    // </properties>

    // <constructor>

    protected constructor(
        @Inject(NgbActiveModal) public modalService: NgbModal,
        public apiService: ApiService,
        public loadingService: LoadingService,
        public ref: ChangeDetectorRef
    ) { }

    // </constructor>

    // <events>

    ngOnInit(): void {
        this.loadLoading();
        this.loadForm();
        if (this.formFilter) {
            const changes = this.formFilter.valueChanges
                .pipe(
                    debounceTime(150),
                    distinctUntilChanged()
                )
                .subscribe(() => this.fetch());
            this.subscriptions.push(changes);
        }
        this.fetch();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sb) => sb.unsubscribe());
    }

    // </events>

    // <methods>

    loadLoading() {
        const sbLoading = this.loadingService.loadingSub
            .pipe(delay(0))
            .subscribe((loading) => {
                this.isLoading = loading;
                this.ref.detectChanges();
            });
        this.subscriptions.push(sbLoading);
    }

    loadForm(): void {
        // child
    }

    fetch(): void {
        let filter = {};
        if (this.formFilter) {
            filter = { ...this.formFilter.getRawValue() };
        }
        this.fetchSanitize(filter);
        const request = this.apiService.getPagingBy(filter, this.pagging)
            .subscribe({
                next: (result: PaggingResultModel) => {
                    this._data$.next(((result || {}).data || []));
                    if (result.summary) {
                        this.paginator.total = result.summary.totalCount;
                    }
                },
                error: () => this._data$.next([])
            });
        this.subscriptions.push(request);
    }

    fetchSanitize(filter: any): void {
        // child 
    }

    fetchReset(): void {
        this.pagging = PAGGING_CRITERIA_DEFAULT;
        this.fetch();
    }

    paginateState(paginator: PaginatorState): void {
        if (!paginator) return;
        this.paginate(paginator.page - 1, paginator.pageSize);
    }

    paginate(offset: number, limit?: number): void {
        if (!!limit) {
            this.pagging.limit = limit;
        }
        this.pagging.offset = offset;
        this.fetch();
    }

    sort(column?: string[]): void {
        if (!column) {
            this.pagging.orderBy = ['id asc'];
        } else {
            this.pagging.orderBy = column;
        }
        this.fetch();
    }

    sortState(column: string) {
        const sorting = this.sorting;
        const isActiveColumn = sorting.column === column;
        if (!isActiveColumn) {
            sorting.column = column;
            sorting.direction = 'asc';
        } else {
            sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
        }
        this.sort([`${this.sorting.column} ${this.sorting.direction}`]);
    }

    delete(id: any): void {
        const modalRef = this.modalService.open(DeleteConfirmModalComponent);
        modalRef.result.then((result) => {
            debugger;
            if (result) {
                const sb = this.apiService.delete(id)
                    .subscribe((r) => {
                        this.fetch();
                    });
                this.subscriptions.push(sb);
            }
        });
    }

    // </methods>
}
