import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuariosService, PaymentService } from '../../../../services/service.index';
import { Payment } from '../../../../models/payment.model';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  PagoForm: FormGroup;

  tour: any;
  user: any;

  fechaReserva: any;
  numberTuristias: any;
  fechaCalender: any;
  priceFinal: any;
  comision: any;
  datosFacturacion = {};
  formProcess = false;

  stripe_key = 'pk_live_MFjCYjJg6B1jNNx5mUaSwFRY00q1xLT3gH';
  cardDetails: { number: string; expMonth: number; expYear: number; cvc: string; };
  metododepago = 0;

  constructor(
    private _usuarioService: UsuariosService,
    private _PaymentService: PaymentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private stripe: Stripe,
    private payPal: PayPal) {


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tour = this.router.getCurrentNavigation().extras.state.tour;
        this.fechaReserva = this.router.getCurrentNavigation().extras.state.fechaReserva;
        this.fechaCalender = this.router.getCurrentNavigation().extras.state.fechaCalender;
        this.numberTuristias = this.router.getCurrentNavigation().extras.state.numberTuristias;
        //
        this.datosFacturacion[0] = this.router.getCurrentNavigation().extras.state.name;
        this.datosFacturacion[1] = this.router.getCurrentNavigation().extras.state.email;
        this.datosFacturacion[2] = this.router.getCurrentNavigation().extras.state.telephone;
      }


      // Formulario
      this.PagoForm = formBuilder.group({
        nameCard: ['', Validators.compose([Validators.required])],
        numberCard: ['', Validators.compose([Validators.required])],
        expMonth: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
        expYear: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
        cvc: ['', Validators.compose([Validators.required])],
      });

    });
  }

  async ngOnInit() {

    this.priceFinal = (this.tour.priceFinal * this.numberTuristias).toFixed(2);
    this.comision = (this.priceFinal - (this.tour.price * this.numberTuristias)).toFixed(2);
  }

  radioChecked(value: string) {
    if (value === 'Card') {
      this.metododepago = 1;
    } else {
      this.metododepago = 2;
    }
  }

  payWithStripe() {

    this.formProcess = true;
    this.stripe.setPublishableKey(this.stripe_key);

    this.cardDetails = {
      number: this.PagoForm.value.numberCard,
      expMonth: this.PagoForm.value.expMonth,
      expYear: this.PagoForm.value.expYear,
      cvc: this.PagoForm.value.cvc,
    };

    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        this.creacionPagoStripe(token.id);
      })
      .catch(error => {
        setTimeout(async () => {
          this.formProcess = false;

          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            message: error.message,
            duration: 3000,
            color: 'danger',
            position: 'bottom'
          });

          toast.present();
        }, 1000);
      });
  }

  async creacionPagoStripe(tokenStripe: string) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.user = await this._usuarioService.getUsuario();

    const pago = new Payment(
      this.user.id,
      this.datosFacturacion[0],
      '',
      this.datosFacturacion[1],
      this.datosFacturacion[2],
      this.cardDetails.number,
      this.priceFinal,
      this.tour.moneda,
      this.fechaReserva,
      this.numberTuristias,
      tokenStripe,
      this.tour.id,
      this.tour.name,
      this.tour.user_id,
    );
    console.log(pago);
    //const valido =
    this._PaymentService.crearPagoStripe(pago)
      .subscribe(resp => {
        this.formProcess = false;
        this.router.navigate(['/home/reservations']);
        loading.dismiss();
      });
    loading.dismiss();
    // console.log(valido);

  }//end creacionPagoStripe

  myBackButton() {
    this.location.back();
  }


  /**
   * Paypal
   */

  payWithPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'Afm-7MnAZh_K1VOBPwadYtmuSqTlUDdAlMMyrkJfFs8lIZz5RmVAGbfW7Qcaz4q3glDBfZMYUkgj6Lgf',
      PayPalEnvironmentSandbox: 'AXPRJfvbU9VltaAkPf04PYcQ_CEh2GFloyQNKDjd4Wxx9vBDCi66edW7yHAVV1CcfS4IeGlH1LrcxiVf'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {

        let payment = new PayPalPayment(this.priceFinal, this.tour.moneda, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
