import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToursciudadService {


  constructor(public http: HttpClient) { }


  obtenerToursCiudad(ciudad: string): Observable<any> {
    const url = environment.apiUrl + 'api/tours/ObtenerToursCiudad/' + ciudad;
    return this.http.get(url);
  }
}

