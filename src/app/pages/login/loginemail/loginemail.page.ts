import { Component, OnInit } from '@angular/core';
import { NavController, Events, ToastController, LoadingController, AlertController, Platform, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';
import { UsuariosService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-loginemail',
  templateUrl: './loginemail.page.html',
  styleUrls: ['./loginemail.page.scss'],
})
export class LoginemailPage implements OnInit {

  usuario: Usuario;
  loginForm: FormGroup;


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public events: Events,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    private modalCtrl: ModalController,
    private _usuariosService: UsuariosService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit() {
  }


  async onLogin() {

    const usuario = new Usuario(
      null,
      this.loginForm.value.email,
      this.loginForm.value.password,
    );
    const valido = await this._usuariosService.login(usuario);
    if (valido) {
      this.navCtrl.navigateRoot('/home/home', { animated: true });
    } else {
    }
  }


  async presentLoading(loading) {
    return await loading.present();
  }

  async recuperarPassword() {
    const modal = await this.modalCtrl.create({
      component: RecoverypasswordComponent,
      componentProps: {
      }
    });

    modal.present();
  }

}
