import { Component, OnInit } from '@angular/core';
import { NetworkService, UsuariosService } from 'src/app/services/service.index';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Password } from '../../../../models/password.model';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {

  formularioPassword: FormGroup;
  constructor(
    private _usuarioService: UsuariosService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private _networkService: NetworkService, ) {

    this.formularioPassword = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      new_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      new_password2: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  async cambiarPassword() {

    if (this.formularioPassword.value.new_password !== this.formularioPassword.value.new_password2) {
      const alert = await this.alertController.create({
        header: 'Warning',
        subHeader: 'Passwords do not match please try again',
        buttons: ['OK']
      });
      await alert.present();
      return false;
    }

    const password = new Password(
      this.formularioPassword.value.password,
      this.formularioPassword.value.new_password
    );

    this.revisarConexion().then(async (resp) => {
      if (resp) {
        const valido = await this._usuarioService.cambiarPassword(password);

        if (valido) {
          const alert = await this.alertController.create({
            header: 'Success',
            subHeader: 'Your password has been updated again log in',
            buttons: ['OK']
          });
          await alert.present();
          this._usuarioService.logout();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Your current password does not match',
            buttons: ['OK']
          });
          await alert.present();
          this.formularioPassword.reset();
        }
      }
    });

  }//end metodo


  async revisarConexion() {
    let result;
    return result = await this._networkService.revisarConexion();
  }
}
