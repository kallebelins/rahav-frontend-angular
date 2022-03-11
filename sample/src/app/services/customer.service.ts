import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ApiService } from "rahav-angular";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class CustomerService 
    extends ApiService {

    // <fields>

    override baseUrl = `${environment.apiUrl}/customer`;

    // </fields>

    // <constructor>

    constructor(@Inject(HttpClient) http: HttpClient) {
        super(http);
    }

    // </constructor>

}