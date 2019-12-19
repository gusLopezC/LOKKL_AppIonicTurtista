import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  constructor(private http: HttpClient) { }
  recoveryPassword(email: string) {
    const Data = {
      email
    };
    const url = environment.apiUrl + '/api/password/create';
    return this.http.post(url, Data).pipe(
      map((resp: any) => {
        return resp;
      })
      ,
      catchError(error => {
        return throwError(error);
      }));
  }

  resetPassword(token: string, password: string) {

    const url = environment.apiUrl + + '/api/password/reset';

    const Data = {
      token,
      password
    };

    return this.http.post(url, Data).pipe(
      map((resp: any) => {
        return resp;
      })
      ,
      catchError(error => {
        return throwError(error);
      }));
  }
}
