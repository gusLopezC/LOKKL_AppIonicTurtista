import { Component, OnInit } from '@angular/core';
import { UsuariosService, ReservasService, NetworkService, ChatService } from '../../../services/service.index';
import { ToastController } from '@ionic/angular';

import { Payment } from '../../../models/payment.model';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage {

  user: any;
  reservas: Payment[] = [];
  NoHayReservas = false;
  NoHaySesioIniciada = false;

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  NoConexion = false;
  Nomensajes = false;

  constructor(
    private _usuarioService: UsuariosService,
    public _reservasService: ReservasService,
    public _ChatService: ChatService,
    private _networkService: NetworkService,
    public toastController: ToastController,
  ) { }

  async ionViewWillEnter() {
    console.log('Entra a mensajes');
    this.revisarSesion();

    this.obtenerMensajes();
  }

  async revisarSesion() {
    this.user = await this._usuarioService.getUsuario();
    console.log(this.user);
    if (!this.user) {
      this.NoHaySesioIniciada = true;
      return false;
    }
  }


  async obtenerMensajes() {
    this.user = await this._usuarioService.getUsuario();

    if (this.user) {
      this._ChatService.obtenerMensajesTurista(this.user.id)
        .subscribe(resp => {
          console.log(resp.Mensajes);

          if (resp.Mensajes.length > 0) {

          } else {
            this.Nomensajes = true;
          }

        });
    }


  }

}
