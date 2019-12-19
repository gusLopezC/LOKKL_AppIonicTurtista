import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ToastController } from '@ionic/angular';
import { UsuariosService, ReservasService } from 'src/app/services/service.index';
import { Payment } from '../../../models/payment.model';
import { Tours } from '../../../models/tour.model';
import { NetworkService, ConnectionStatus } from '../../../services/network/network.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  user: any;
  tours: Tours[] = [];
  reservas: Payment[] = [];
  conection: ConnectionStatus;


  NoHaySesioIniciada = false;
  HayTours = false;
  NoHayTours = false;

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  NoConexion = false;
  messajeVentana = 1;

  constructor(
    private _usuarioService: UsuariosService,
    public _reservasService: ReservasService,
    private _networkService: NetworkService,
    public toastController: ToastController,
  ) {
  }

  async ngOnInit() {
    this.revisarSesion();

    this.obtenerReservaciones();
  }

  segmentChanged(event) {
    const valorSegmento = event.detail.value;

    if (valorSegmento === 'Activas') {
      this.obtenerReservaciones();
    } else {
      this.mostrarHistorial();
    }
  }

  async obtenerReservaciones(refresher?) {
    this.user = await this._usuarioService.getUsuario();

    this.revisarConexion().then((valido) => {
      if (valido && (this.user)) {
        this._reservasService.obtenerMisViajes(this.user.id)
          .subscribe(resp => {
            this.reservas = [];
            if (resp.Reservaciones.length >= 1) {
              this.HayTours = true;
              this.NoHayTours = false;
              this.reservas = resp.Reservaciones;
              console.log(this.reservas);

            } else {
              this.messajeVentana = 1;
              this.HayTours = false;
              this.NoHayTours = true;
            }
          });
      } else {
        this.NoConexion = true;
        this.HayTours = false;
      }
    });
    if (refresher) {
      refresher.target.complete();
    }
  }

  async mostrarHistorial() {

    this.revisarConexion().then((valido) => {
      if (valido && this.user) {
        this._reservasService.obtenerHistorialMisViajes(this.user.id)
          .subscribe(resp => {
            console.log(resp);
            this.reservas = [];
            if (resp.Reservaciones.length >= 1) {
              this.reservas = resp.Reservaciones;
              this.HayTours = true;
              this.NoHayTours = false;
            } else {
              this.messajeVentana = 2;
              this.HayTours = false;
              this.NoHayTours = true;
            }
          });
      } else {
        this.NoConexion = true;
        this.HayTours = false;
      }
    });
  }

  async revisarSesion() {
    this.user = await this._usuarioService.getUsuario();
    if (!this.user) {
      this.NoHaySesioIniciada = true;
      return false;
    }
  }

  async revisarConexion() {
    this.reservas = [];
    let result;
    return result = await this._networkService.revisarConexion();
  }

}
