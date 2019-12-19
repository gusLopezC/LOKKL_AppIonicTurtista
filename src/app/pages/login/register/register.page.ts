import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UsuariosService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  usuario: Usuario;
  loginForm: FormGroup;
  role: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private _usuariosService: UsuariosService,
    public navCtrl: NavController,
    private toastController: ToastController,
    private router: Router,
    private iab: InAppBrowser) {
    this.loginForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  async register() {

    const usuario = new Usuario(
      this.loginForm.value.name,
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.loginForm.value.image,
      this.loginForm.value.telefono,
      this.loginForm.value.infopersonal,
      this.role = 'USER_ROLE',
      this.loginForm.value.google,
    );


    const valido = await this._usuariosService.register(usuario);
    console.log(valido);
    if (valido) {
      this.navCtrl.navigateRoot('/home/home', { animated: true });
    } else {
    }

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se a registrado correctamente',
      duration: 2000
    });
    toast.present();
  }


  abrirlink(url: string) {
    const browser = this.iab.create(url);

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
