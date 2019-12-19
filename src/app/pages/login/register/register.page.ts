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

  public onRegisterForm: FormGroup;
  role: string;

  constructor(
    private formBuilder: FormBuilder,
    private _usuariosService: UsuariosService,
    public navCtrl: NavController,
) {
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  async signUp() {

    const usuario = new Usuario(
      this.onRegisterForm.value.fullName,
      this.onRegisterForm.value.email,
      this.onRegisterForm.value.password,
      this.onRegisterForm.value.image,
      this.onRegisterForm.value.telefono,
      this.onRegisterForm.value.infopersonal,
      this.role = 'USER_ROLE',
      this.onRegisterForm.value.google,
    );


    const valido = await this._usuariosService.register(usuario);
    if (valido) {
      this.navCtrl.navigateRoot('/home/home', { animated: true });
    } else {
    }

  }


}
