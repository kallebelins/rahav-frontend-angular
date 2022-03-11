import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { PaggingCriteriaModel, PAGGING_CRITERIA_DEFAULT } from "../models/logic/pagging-criteria.model";
import { PaggingResultModel } from "../models/logic/pagging-result.model";

/**
 * @description Service to consume API with BusinessResult
 */
@Injectable({ providedIn: 'root' })
export class ApiService {

  public baseUrl: string = '';

  constructor(
    protected http: HttpClient
  ) {
  }

  /**
  * @description Manipulate data item
  */
  protected handleData(model: any): any {
    return (model || {}).data;
  }


  /**
  * @description Manipulate data list
  */
  protected handleDataList(model: any): any[] {
    return ((model || {}).data || []);
  }

  /**
 * @description handle error message
 */
  protected handleError(error: any): Observable<any> {
    return throwError(() => error);
  }

  /**
  * @description data fields from model to query form format
  */
  protected getQueryParamsFromModel(model?: any): string {
    if (!model) {
      return '';
    }
    const params: URLSearchParams = new URLSearchParams();
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const val = model[key];
        if (val != null && val != undefined) {
          params.set(key, val);
        }
      }
    }
    return params.toString();
  }

  /**
   * @description data fields from model to query form format
   */
  protected getFormDataParamsFromModel(model?: any): FormData {
    const params: FormData = new FormData();
    if (!model) {
      return params;
    }
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const val = model[key];
        params.append(key, val);
      }
    }
    console.log('formdata', params);
    return params;
  }

  /**
   * @description Get list of objects
   */
  getList(url: string = ''): Observable<any[]> {
    return this.http.get(`${this.baseUrl}${url}`)
      .pipe(
        map(this.handleDataList),
        catchError(this.handleError)
      );
  }

  /**
   * @description Get list of objects paginated by filter and pagination criteria
   */
  getBy(model?: any, criteria: PaggingCriteriaModel = PAGGING_CRITERIA_DEFAULT, url: string = '', options: any = {}): Observable<any[]> {
    return this.http.get(`${this.baseUrl}${url}?${this.getQueryParamsFromModel({ ...model, ...criteria }) || ''}`, options)
      .pipe(
        map(this.handleDataList),
        catchError(this.handleError)
      );
  }

  /**
   * @description Gets pagination object by filter and pagination criteria
   */
  getPagingBy(model?: any, criteria: PaggingCriteriaModel = PAGGING_CRITERIA_DEFAULT, url: string = '', options: any = {}): Observable<PaggingResultModel> {
    return this.http.get(`${this.baseUrl}${url || ''}?${this.getQueryParamsFromModel({ ...model, ...criteria }) || ''}`, options)
      .pipe(
        map(result => result),
        catchError(this.handleError)
      );
  }

  /**
   * @description Get object by id
   */
  getById(id: any, criteria?: PaggingCriteriaModel, url: string = '', options: any = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}${url || ''}/${id}?${this.getQueryParamsFromModel({ ...criteria }) || ''}`, options)
      .pipe(
        map(this.handleData),
        catchError(this.handleError)
      );
  }

  /**
   * @description 
   */
  create(model: any, url: string = '', options: any = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}${url || ''}`, model, options)
      .pipe(
        map(this.handleData),
        catchError(this.handleError)
      );
  }

  /**
   * @description 
   */
  update(id: any, model: any, url: string = '', options: any = {}): Observable<any> {
    return this.http.put(`${this.baseUrl}${url || ''}/${id}`, model, options)
      .pipe(
        map(() => model),
        catchError(this.handleError)
      );
  }

  /**
   * @description 
   */
  delete(id: any, url: string = '', options: any = {}): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}/${id}`, options)
      .pipe(
        map(() => null),
        catchError(this.handleError)
      );
  }
}