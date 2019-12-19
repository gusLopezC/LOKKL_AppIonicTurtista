import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-termsandcondicions',
  templateUrl: './termsandcondicions.page.html',
  styleUrls: ['./termsandcondicions.page.scss'],
})
export class TermsandcondicionsPage implements OnInit {

  language: string;
  mostrarTerminosEspanol = false;
  mostrarPrivacidadEspanol = false;
  mostrarTerminosIngles = false;
  mostrarPrivacidadIngles = false;


  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.language = this.translate.getBrowserLang();
  }

  mostrarOpcion(opcion: number) {
    if (opcion === 1) {
      this.mostrarTerminosEspanol = true;
      this.mostrarPrivacidadEspanol = false;
    }
    if (opcion === 2) {
      this.mostrarPrivacidadEspanol = true;
      this.mostrarTerminosEspanol = false;
    }
    if (opcion === 3) {
      this.mostrarTerminosIngles = true;
      this.mostrarPrivacidadIngles = false;
    }
    if (opcion === 4) {
      this.mostrarPrivacidadIngles = true;
      this.mostrarTerminosIngles = false;
    }

  }

}
