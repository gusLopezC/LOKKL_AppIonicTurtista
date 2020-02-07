import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';


import { Usuario } from 'src/app/models/usuario.model';
import { Password } from '../../models/password.model';
import { DatosPersonales } from '../../models/datosPersonales.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: string = null;
  private usuario: Usuario;
  user: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    public toastController: ToastController, ) { }


  login(usuario: Usuario) {
    const url = environment.apiUrl + '/api/login';

    return new Promise(resolve => {
      this.http.post(url, usuario)
        .subscribe(async resp => {
          if (resp['token']) {
            await this.guardarToken(resp['token'], resp['user']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        },
          (async err => {
            const toast = await this.toastController.create({
              message: 'Tu correo o contraseña es incorrecto vuelve a intentar',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }));
    });


  }

  loginRedSocial(usuario: any) {

    usuario.name = usuario.displayName;

    console.log(usuario);
    const url = environment.apiUrl + '/api/LoginGoogle';

    return new Promise(resolve => {
      this.http.post(url, usuario)
        .subscribe(async resp => {
          if (resp['token']) {
            await this.guardarToken(resp['token'], resp['user']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  register(usuario: Usuario) {
    const url = environment.apiUrl + '/api/register';

    return new Promise(resolve => {
      this.http.post(url, usuario)
        .subscribe(async resp => {
          if (resp['token']) {
            await this.guardarToken(resp['token'], resp['user']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/home/home', { animated: true });
  }

  async getUsuario() {

    this.user = await this.storage.get('usuario') || null;
    return this.user;

  }

  async getToken() {

    this.token = await this.storage.get('token') || null;
    return this.token;

  }

  async guardarToken(token: string, usuario: Usuario) {

    this.token = token;
    await this.storage.set('token', token);
    await this.storage.set('usuario', usuario);
    // await this.validaToken();
  }

  async cargarToken() {

    this.token = await this.storage.get('token') || null;
    this.user = await this.storage.get('usuario') || null;

  }

  async actualizarUsuario(usuario: Usuario) {

    this.token = await this.storage.get('token') || null;
    const url = environment.apiUrl + '/api/users/' + usuario.id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return new Promise(resolve => {
      return this.http.put(url, usuario, { headers })
        .subscribe(async resp => {
          if (resp['token']) {
            await this.guardarToken(resp['token'], resp['user']);
            resolve(true);
          } else {

            resolve(false);
          }
        });
    });

  }

  async cambiarImagen(archivo: File) {

    this.token = await this.storage.get('token') || null;

    const url = environment.apiUrl + '/api/users/perfil/foto';
    const formData = new FormData();
    formData.append('photo', archivo);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return new Promise(resolve => {
      return this.http.post(url, formData, { headers })
        .subscribe(async resp => {
          if (resp['token']) {
            await this.guardarToken(resp['token'], resp['user']);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async cambiarPassword(password: Password) {

    this.token = await this.storage.get('token') || null;

    const url = environment.apiUrl + '/api/users/perfil/changepassword';
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return new Promise(resolve => {
      return this.http.post(url, password, { headers })
        .subscribe(async resp => {
          resolve(true);
        },
          (err => {
            resolve(true);
          })
        );
    });
  }


  async borrarUsuario(id: any) {

    this.token = await this.storage.get('token') || null;

    const url = environment.apiUrl + '/api/users/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return new Promise(resolve => {
      return this.http.delete(url, { headers })
        .subscribe(async resp => {
          if (resp) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  obtenerInformacionContacto(id: number, token: string): Observable<any> {

    const url = environment.apiUrl + 'api/users/contactoEmergencia/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);


    return this.http.get(url, { headers });
  }

  guardarContactoemergencia(datos: DatosPersonales): Observable<any> {

    const url = environment.apiUrl + 'api/users/guardarcontactoEmergencia';


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, datos, { headers });

  }

  archivoValidacion(archivo, token: string): Observable<any> {

    var cuerpoDatos = {
      archivo
    }
    
    const url = environment.apiUrl + 'api/users/archivovalidacionApp';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.post(url, cuerpoDatos, { headers });
  }

}
