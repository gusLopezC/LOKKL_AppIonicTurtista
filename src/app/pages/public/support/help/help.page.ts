import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/service.index';
import { LoadingController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {

  contactForm: FormGroup;
  verWhatsapp = false;
  verCorreo = false;


  constructor(
    private formBuilder: FormBuilder,
    private _emailService: EmailService,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing) {

    this.contactForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
  }

  abrirlink() {
    this.iab.create(
      'https://lokkl.com/support/help', '_self'
    );
  }
  changeWhatsapp() {
    if (this.verWhatsapp) {
      this.verWhatsapp = false;
    } else {
      this.verWhatsapp = true;
    }
  }

  changeCorreo() {
    if (this.verCorreo) {
      this.verCorreo = false;
    } else {
      this.verCorreo = true;
    }
  }

  async sendEmail() {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    const valido = await this._emailService.enviarMailContacto(
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.message);

    console.log(valido);
    if (valido) {
      this.contactForm.reset();
      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Your email has been successfully',
        duration: 1500
      });
      toast.present();
    }
  }

}
