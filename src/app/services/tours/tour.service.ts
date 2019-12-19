import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  token: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.obtenertoken();
  }

  async obtenertoken() {
    return this.token = await this.storage.get('token') || null;
  }

  obtenerToursNuevos(): Observable<any> {
    const url = environment.apiUrl + '/api/tours/ObtenerToursNuevos';
    return this.http.get(url);
  }

  obtenerTour(slug: string): Observable<any> {
    const url = environment.apiUrl + '/api/tours/ObtenerTour/' + slug;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    // headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });
  }

  buscarPorCiudad(placeID: string): Observable<any> {

    const url = environment.apiUrl + '/api/tours/ObtenerPorCiudad/' + placeID;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });
  }
}
