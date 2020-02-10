import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Payment } from '../../models/payment.model';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.obtenertoken();
  }

  async obtenertoken() {
    return this.token = await this.storage.get('token') || null;
  }



  obtenerMensajesTurista(id: any, token: string): Observable<any> {

    const url = environment.apiUrl + 'api/mensajes/obtenerChatsTurista/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get(url, { headers });
  }

  obtenerChatReservacion(id: any, token: string): Observable<any> {


    const url = environment.apiUrl + 'api/mensajes/obtenerChatReservacion/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get(url, { headers });
  }


  sendMessage(reserva, message: string, token: string): Observable<any> {

    console.log(reserva);

    var cuerpoDatos = {
      id_reservacion : reserva.id_reservacion,
      id_comprador : reserva.id_comprador,
      id_guia : reserva.id_guia,
      message
    };

    const url = environment.apiUrl + 'api/mensajes/sendMessage';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.post(url, cuerpoDatos, { headers });
  }

}
