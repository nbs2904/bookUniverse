import { PaymentMethod } from "./../interfaces/paymentMethod";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PaymentMethodService {

    constructor(private http: HttpClient) { }

    getPaymentMethods(): Observable<PaymentMethod[]>{
        return this.http.get<PaymentMethod[]>("api/paymentMethod");
    }
}
