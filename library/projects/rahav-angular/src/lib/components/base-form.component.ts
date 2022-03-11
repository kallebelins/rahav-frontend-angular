import { FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, delay, of, Subscription, tap } from 'rxjs';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-base-form',
    template: ''
})
export abstract class BaseFormComponent
    implements OnInit, OnDestroy {

    // <fields>

    id: any;
    isView: boolean = false;
    isUpdate: boolean = false;
    model: any = { id: null };
    previousModel: any = { id: null };
    isLoading: boolean = false;
    formGroup!: FormGroup;
    subscriptions: Subscription[] = [];

    // </fields>

    // <properties>

    // </properties>

    // <constructor>

    protected constructor(
        public route: ActivatedRoute,
        public router: Router,
        public apiService: ApiService,
        public loadingService: LoadingService,
        public ref: ChangeDetectorRef
    ) { }

    // </constructor>

    // <events>

    ngOnInit(): void {
        this.loadLoading();
        this.loadForm();
        const sbRoute = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.checkRouteAction();
            this.fetchById();
        });
        this.subscriptions.push(sbRoute);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
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

    checkRouteAction(): void {
        if (!!this.id) {
            if (this.router.url.indexOf('/view') !== -1) {
                this.isView = true;
            } else {
                this.isUpdate = true;
            }
        }
    }

    fetchById(): void {
        if (!this.id) return;
        const sbGetById = this.apiService.getById(this.id)
            .subscribe({
                next: (result: any) => {
                    if (!!result) {
                        this.model = result;
                        this.previousModel = Object.assign({}, result);
                        this.patchForm();
                    }
                },
                error: (error) => console.log(error)
            });
        this.subscriptions.push(sbGetById);
    }

    loadForm(): void {
        // child
    }

    patchForm(): void {
        // child
    }

    save() {
        this.formGroup.markAllAsTouched();
        if (!this.formGroup.valid) {
            return;
        }
        const formValues = this.formGroup.value;
        const modelRequest = this.actionSanitize(Object.assign(this.model, formValues));
        if (this.id) {
            this.update(modelRequest);
        } else {
            this.create(modelRequest);
        }
    }

    actionSanitize(model: any): any {
        return model;
    }

    update(modelRequest: any) {
        const sbUpdate = this.apiService.update(this.id, modelRequest)
            .subscribe(result => {
                this.model = result;
                this.actionSuccess();
            });
        this.subscriptions.push(sbUpdate);
    }

    create(modelRequest: any) {
        const sbCreate = this.apiService.create(modelRequest)
            .subscribe(result => {
                this.id = result;
                this.actionSuccess();
            });
        this.subscriptions.push(sbCreate);
    }

    actionSuccess(): void {
        // child
    }

    reset() {
        if (!this.previousModel) {
            return;
        }
        this.model = Object.assign({}, this.previousModel);
        this.patchForm();
    }

    // </methods>

    // <validation>

    isControlValid(controlName: string): boolean {
        if (!this.formGroup) return false;
        const control = this.formGroup.controls[controlName];
        return control.valid && (control.dirty || control.touched);
    }

    isControlInvalid(controlName: string): boolean {
        if (!this.formGroup) return false;
        const control = this.formGroup.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }

    controlHasError(validation: string, controlName: string) {
        if (!this.formGroup) return false;
        const control = this.formGroup.controls[controlName];
        return control.hasError(validation) && (control.dirty || control.touched);
    }

    isControlTouched(controlName: string): boolean {
        if (!this.formGroup) return false;
        const control = this.formGroup.controls[controlName];
        return control.dirty || control.touched;
    }

    // </validation>
}
