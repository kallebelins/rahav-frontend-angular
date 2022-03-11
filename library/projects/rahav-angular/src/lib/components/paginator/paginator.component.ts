import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PaginatorState, PageSizes } from '../../models/view/paginator.model';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

    @Input() paginator!: PaginatorState;
    @Input() isLoading!: boolean;
    @Output() paginate: EventEmitter<PaginatorState> = new EventEmitter();
    pageSizes: number[] = PageSizes;

    pageChange(num: number) {
        this.paginator.page = num;
        this.paginate.emit(this.paginator);
    }

    sizeChange() {
        this.paginator.pageSize = +this.paginator.pageSize;
        this.paginator.page = 1;
        this.paginate.emit(this.paginator);
    }
}
