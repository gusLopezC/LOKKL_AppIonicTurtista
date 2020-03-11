import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Payment } from '../../../models/payment.model';


@Component({
  selector: 'app-reservas-activas',
  templateUrl: './reservas-activas.component.html',
  styleUrls: ['./reservas-activas.component.scss'],
})
export class ReservasActivasComponent implements OnInit {

  @Input() reservas: Payment[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router, ) {
  }

  ngOnInit() {
  }

  async lanzarMenu(reserva) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Send Message',
        icon: 'chatboxes',
        handler: () => {

          if (this.reservas[0].status === 'Pendiente') {
            this.mostrarAlertaChat();
            return false;
          }
          let navigationExtras: NavigationExtras = {
            state: {
              reserva: reserva,
              nameCliente: reserva.get_guia[0].name

            }
          };
          this.router.navigate(['/chat'], navigationExtras);
        }
      }, {
        text: 'Cancel Reservation',
        icon: 'close',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {
              reserva: reserva,
            }
          };
          this.router.navigate(['/cancel-reservation'], navigationExtras);
        }
      }]
    });
    await actionSheet.present();
  }

  async mostrarAlertaChat() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deben aceptar la reserva primero',
      buttons: ['OK']
    });

    await alert.present();

  }

}
