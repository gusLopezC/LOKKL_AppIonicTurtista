import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

import { ChatService, UsuariosService, ReservasService, NetworkService } from '../../../../services/service.index';
import * as firebase from 'firebase';
import { Usuario } from '../../../../models/usuario.model';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  reserva: any;

  roomkey: string;

  userId = '';
  message: string;
  chats = [];
  token: string;
  user: Usuario;

  constructor(
    private _usuarioService: UsuariosService,
    public _reservasService: ReservasService,
    public _ChatService: ChatService,
    private _networkService: NetworkService,
    public toastController: ToastController,
    public navCtrl: NavController,
    private location: Location,
    public route: ActivatedRoute,
    private router: Router, ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reserva = this.router.getCurrentNavigation().extras.state.reserva;
      }
    });
  }

  async ionViewWillEnter() {
    this.user = await this._usuarioService.getUsuario();
    console.log(this.user);
    this.obtenerMensajes();
  }// end ngOnit


  async obtenerMensajes() {

    this.token = await this._usuarioService.getToken();

    this._ChatService.obtenerChatReservacion(this.reserva.id, this.token)
      .subscribe(resp => {
        console.log(resp.Mensajes);
        if (resp.Mensajes.length > 0) {
          this.chats = resp.Mensajes;

        }
      });

  }


  exitChat() {
    // this.sendExitMessage();
    this.location.back();
  }

  async sendChatMessage() {

    this.token = await this._usuarioService.getToken();

    this._ChatService.sendMessage(this.reserva, this.message, this.token)
      .subscribe(resp => {
        console.log(resp.Mensajes);
        if (resp.Mensajes.length > 0) {
          this.chats = resp.Mensajes;

        }
      });
  }

}
