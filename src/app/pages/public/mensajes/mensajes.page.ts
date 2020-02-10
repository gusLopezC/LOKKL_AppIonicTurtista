import { Component, OnInit } from '@angular/core';
import { UsuariosService, ReservasService, NetworkService, ChatService } from '../../../services/service.index';
import { ToastController } from '@ionic/angular';

import { Payment } from '../../../models/payment.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage {

  mensajes: any;
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
  token: string;

  constructor(
    private _usuarioService: UsuariosService,
    public _reservasService: ReservasService,
    public _ChatService: ChatService,
    private _networkService: NetworkService,
    public toastController: ToastController,
    private router: Router
  ) { }

  async ionViewWillEnter() {
    this.revisarSesion();

    this.obtenerMensajes();
  }

  async revisarSesion() {
    this.user = await this._usuarioService.getUsuario();
    if (!this.user) {
      this.NoHaySesioIniciada = true;
      return false;
    }
  }


  async obtenerMensajes() {
    this.user = await this._usuarioService.getUsuario();
    this.token = await this._usuarioService.getToken();

    if (this.user) {
      this._ChatService.obtenerMensajesTurista(this.user.id, this.token)
        .subscribe(resp => {
          console.log(resp);
          if (resp.Mensajes.length > 0) {
            this.mensajes = resp.Mensajes;
          } else {
            this.Nomensajes = true;
          }

        });
    }
  }

  abrirChat(mensajes) {

    let navigationExtras: NavigationExtras = {
      state: {
        reserva: mensajes,
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

}
