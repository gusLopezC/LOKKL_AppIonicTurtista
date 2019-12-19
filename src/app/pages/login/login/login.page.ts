import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuariosService } from '../../../services/service.index';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  isLoggedIn = false;
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };

  constructor(
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
    private platform: Platform,
    // private fb: Facebook,
    // private googlePlus: GooglePlus,
    private fireAuth: AngularFireAuth,
    private _usuariosService: UsuariosService) {
  }
  /*
    async doGoogleLogin() {
  
      console.log('Inicia intento de sesion con Google');
      let params;
      if (this.platform.is('android')) {
        params = {
          'scopes': '',
          'webClientId': '409077895951-qaitrdbd57oji686am5pipdngh377r98.apps.googleusercontent.com',
          'offline': true,
        };
      } else {
        params = {};
      }
      this.googlePlus.login(params)
        .then((response) => {
          console.log('Todo bien');
          const { idToken, accessToken } = response;
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          console.log(error);
          alert('error:' + JSON.stringify(error));
        });
    }// end login Google
  
    onLoginSuccess(accessToken, accessSecret) {
      const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
          .credential(accessToken);
      this.fireAuth.auth.signInWithCredential(credential)
        .then((response) => {
          console.log(response);
        });
  
    }
   
    async doFbLogin() {
      console.log('Inicio de sesion con facebook');
      // the permissions your facebook app needs from the user
      const permissions = ['email'];
  
      this.fb.login(permissions)
        .then((response: FacebookLoginResponse) => {
          this.onLoginSuccessFacebbok(response);
        }, error => {
          console.log(error);
          if (!this.platform.is('cordova')) {
          }
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
          }
        });
  
    }
  
    onLoginError(err) {
      console.log(err);
    }*/

}
