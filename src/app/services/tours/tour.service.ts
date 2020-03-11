import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { TranslateconfigService } from '../translate/translateconfig.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  token: string;
  selectedLanguage: string;

  constructor(
    public http: HttpClient,
    private storage: Storage,
    private translateConfigService: TranslateconfigService,
  ) {
    this.obtenertoken();
  }

  async obtenertoken() {
    return this.token = await this.storage.get('token') || null;
  }

  obtenerToursNuevos(): Observable<any> {
    const url = environment.apiUrl + 'api/tours/ObtenerToursNuevos';
    return this.http.get(url);
  }

  obtenerTour(slug: string): Observable<any> {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

    const url = environment.apiUrl + '/api/tours/ObtenerTour/' + slug + '/' + this.selectedLanguage;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    // headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });
  }

  buscarPorCiudad(placeID: string): Observable<any> {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

    const url = environment.apiUrl + 'api/tours/' + this.selectedLanguage + '/ObtenerPorCiudad/' + placeID;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });
  }


  obtenerTourScrollInfinite(numeropagina: number): Observable<any> {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

    const url = environment.apiUrl + 'api/tours/' + this.selectedLanguage + '/ObtenerTourInfiniteScroll?page=' + numeropagina;

    return this.http.get(url);

  }
}
