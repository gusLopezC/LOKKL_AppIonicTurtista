import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, AlertController, Platform, NavController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { UsuariosService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;


  constructor(
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private platform: Platform,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public translate: TranslateService,
    private fireAuth: AngularFireAuth,
    private _usuariosService: UsuariosService) {
  }



  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async onLogin() {

    const usuario = new Usuario(
      null,
      this.onLoginForm.value.email,
      this.onLoginForm.value.password,
    );
    const valido = await this._usuariosService.login(usuario);
    if (valido) {
      this.navCtrl.navigateRoot('/home', { animated: true });
    } else {
    }
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('Login.RecuperarCuenta'),
      message: this.translate.instant('Login.OlvidemicontrasenaTexto'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.translate.instant('Login.RecuperarCuenta'),
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async doGoogleLogin() {

    const params = {
      'webClientId': '934468496584-u8a02oqm0httfv6d81hhl84etfibgo41.apps.googleusercontent.com',
      'offline': true,
    };

    this.googlePlus.login(params)
      .then((response) => {
        this.onLoginSuccess((response));
      }).catch((error) => {
        console.log(error);
        this.onLoginError(error);
      });
  }// end login Google

  onLoginSuccess(response) {

    const UsuarioReponse = {
      uid: response.userId,
      displayName: response.displayName,
      photoURL: response.imageUrl,
      email: response.email,
      phoneNumber: null,
      providerId: null,
      name: response.givenName
    };

    const valido = this._usuariosService.loginRedSocial(UsuarioReponse);
    if (valido) {
      this.navCtrl.navigateRoot('/home/home', { animated: true });
    } else {
      return false;
    }

  }

  async doFbLogin() {
    console.log('Intento ingreso facebook');
    // the permissions your facebook app needs from the user
    const permissions = ['email'];

    this.fb.login(permissions)
      .then((response: FacebookLoginResponse) => {
        console.log(response);
        this.onLoginSuccessFacebbok(response);
      }, error => {
        console.log(error.errorMessage);
        this.onLoginError(error.errorMessage);
      });
  }

  onLoginSuccessFacebbok(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        const valido = this._usuariosService.loginRedSocial(response.user.providerData[0]);
        if (valido) {
          this.navCtrl.navigateRoot('/home/home', { animated: true });
        } else {
          return false;
        }
      });
  }

  async onLoginError(err) {
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      message: 'A ocurrido un error vuelve a intentar.' + err,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });

    toast.present();

  }
}
