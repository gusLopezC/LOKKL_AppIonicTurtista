import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  token: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.obtenertoken();
  }
  async obtenertoken() {
    return this.token = await this.storage.get('token') || null;
  }
  obtenerMisViajes(id: string): Observable<any> {

    const url = environment.apiUrl + '/api/reservaciones/obtenerMisViajes/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });

  }

  obtenerHistorialMisViajes(id: string): Observable<any> {

    const url = environment.apiUrl + '/api/reservaciones/obtenerHistorialMisViajes/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });

  }


  /**
   * Cancelaciones
   */


  revisarPuedeCancelar(pedido: string) {
    const url = environment.apiUrl + '/api/reservaciones/obtenerDiferenciasDias/' + pedido;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });

  }

  cancelarReservacionCliente(pedido: string, motivo: string) {
    const url = environment.apiUrl + '/api/reservaciones/cancelarReservacionCliente';

    const DatosCancelacion = {
      pedido,
      motivo
    };
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, DatosCancelacion, { headers });
  }
}
