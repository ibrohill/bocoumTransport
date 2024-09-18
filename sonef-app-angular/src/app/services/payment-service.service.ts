import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://paytech.sn/api/payment/request-payment';

  constructor(private http: HttpClient) { }

  requestPayment(paymentData: any) {
    return this.http.post(this.apiUrl, paymentData);
  }
}
