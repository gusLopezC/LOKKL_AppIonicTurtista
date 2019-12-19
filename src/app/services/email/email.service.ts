import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http: HttpClient) { }


  enviarMailContacto(name: string, email: string, textomensaje: string) {

    var CuerpoCorreo = {
      name,
      email,
      textomensaje,
    };

    const url = environment.apiUrl + '/api/emailContacto';
    return new Promise(resolve => {
      this.http.post(url, CuerpoCorreo).subscribe(
        async resp => {
          resolve(true);
        }
      );
    });
  }
}
