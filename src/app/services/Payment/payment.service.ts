import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Payment } from '../../models/payment.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  token: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.obtenertoken();
  }
  async obtenertoken() {
    return this.token = await this.storage.get('token') || null;
  }

  crearPagoStripe(pago: Payment) {

    const url = environment.apiUrl + '/api/transactions/paymentStripe';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    //return new Promise(resolve => {
    return this.http.post(url, pago, { headers });
    //.subscribe(resp => {
    //console.log(resp);
    //    resolve(true);
    // },
    // (err => {
    // resolve(true);
    // })
    // );
    // });

  }


}
