import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RecoveryPasswordService } from 'src/app/services/service.index';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.scss'],
})
export class RecoverypasswordComponent implements OnInit {

  usuario: Usuario;
  formulario: NgForm;

  constructor(
    private modalCtrl: ModalController,
    public _RecoveryPasswordService: RecoveryPasswordService,
    public toastController: ToastController,
    public router: Router) { }

  ngOnInit() {
  }

  enviarCorreoRecuperacion(formulario: NgForm) {
    if (formulario.value.email === null || formulario.value.email === '') {
      return false;
    }

    this._RecoveryPasswordService.recoveryPassword(formulario.value.email)
      .subscribe(respo => {
        this.presentToast();
        this.regresar();
      });

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se a enviado el link de recuperación',
      duration: 2000
    });
    toast.present();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
