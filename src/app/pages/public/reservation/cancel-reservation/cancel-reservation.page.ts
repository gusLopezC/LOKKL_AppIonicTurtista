import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReservasService } from '../../../../services/service.index';
import { TranslateconfigService } from '../../../../services/translate/translateconfig.service';
import { Payment } from '../../../../models/payment.model';

import { IonRadioGroup } from '@ionic/angular';
import { opcionesEspaniol, opcionesIngles } from './opcionesCancelation';

@Component({
  selector: 'app-cancel-reservation',
  templateUrl: './cancel-reservation.page.html',
  styleUrls: ['./cancel-reservation.page.scss'],
})
export class CancelReservationPage implements OnInit {

  @ViewChild('radioGroup', { static: true }) radioGroup: IonRadioGroup;
  puedeCancelar: boolean;
  nopuedeCancelar: boolean;
  pedido: any;
  reserva: Payment;

  // Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  // Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  radio_list: any;
  selectedLanguage: string;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _reservasService: ReservasService,
    private translateConfigService: TranslateconfigService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pedido = this.router.getCurrentNavigation().extras.state.reserva;
        this.definirIdioma();
        this.obtenerReservacion(this.pedido.order_nr);
      }
    });
  }

  ngOnInit() {
  }

  definirIdioma() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    if (this.selectedLanguage === 'es') {
      this.radio_list = opcionesEspaniol;
    } else {
      this.radio_list = opcionesIngles;
    }

  }
  obtenerReservacion(pedido: string) {
    this._reservasService.revisarPuedeCancelar(pedido)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.HorasparaTour >= 48) {
          this.puedeCancelar = true;
          this.reserva = resp.Reservaciones;
        } else {
          this.nopuedeCancelar = true;
        }
      });

  }


  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }


  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;
  }

  CancelarTour() {

    if (!this.selectedRadioItem) {
      this.presentAlert();
      return false;
    }

    this._reservasService.cancelarReservacionCliente(this.pedido, this.selectedRadioItem.value)
      .subscribe((resp: any) => {
        this.confirmacionCancelacion();
      });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please select an option',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmacionCancelacion() {
    const alert = await this.alertController.create({
      message: 'Your tour has been canceled, we will proceed to the refund',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }

  myBackButton() {
    this.location.back();
  }
}
