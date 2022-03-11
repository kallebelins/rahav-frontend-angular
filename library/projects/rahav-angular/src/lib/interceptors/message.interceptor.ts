import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class MessageInterceptor implements HttpInterceptor {

    constructor(
        private toastrSvc: ToastrService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError((err) => {
                // process error responses here
                if (!!err.error && err.error.hasErrors) {
                    this.show(err.error);
                }
                return err;
            }))
            .pipe(map<any, any>((evt: any) => {
                if (evt instanceof HttpResponse) {
                    // process successful responses here
                    if (!!evt.body) {
                        this.show(evt.body);
                    }
                }
                return evt;
            }));
    }

    show(response: any): void {
        if (!response) return;
        const messages = response.messages;
        if (!!messages) {
            // tslint:disable-next-line:forin
            for (const msgKey in messages) {
                const msg = messages[msgKey];
                switch (msg.typeCode) {
                    case 0:
                        this.toastrSvc.success(msg.message);
                        break;
                    case 1:
                        this.toastrSvc.info(msg.message);
                        break;
                    case 2:
                        this.toastrSvc.warning(msg.message);
                        break;
                    case 3:
                        this.toastrSvc.error(msg.message);
                        break;
                }
            }
        }
    }
}
