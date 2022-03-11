import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NgPagination } from './components/paginator/ng-pagination/ng-pagination.component';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MessageInterceptor } from './interceptors/message.interceptor';
import { ApiService } from './services/api.service';
import { LoadingService } from './services/loading.service';

@NgModule({
    declarations: [
        FirstLetterPipe,
        SafePipe,
        PaginatorComponent, 
        NgPagination, 
        SortIconComponent, 
        DeleteConfirmModalComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule,
        NgbModule
    ],
    exports: [
        FirstLetterPipe,
        SafePipe,
        PaginatorComponent, 
        NgPagination, 
        SortIconComponent, 
        DeleteConfirmModalComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'en-US' },
        ApiService,
        LoadingService
    ],
})
export class RahavAngularModule { }