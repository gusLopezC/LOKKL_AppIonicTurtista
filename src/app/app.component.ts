import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateconfigService } from './services/translate/translateconfig.service';
import { GeolocationService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  estaLogueado: any;
  selectedLanguage: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private translateConfigService: TranslateconfigService,
    private _geolocationService: GeolocationService,
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      this.estaLogueado = await this.storage.get('token');
      if (this.estaLogueado) {
        this.router.navigate(['/home/home']);
        this.splashScreen.hide();
      } else {
        this.router.navigate(['/login']);
        this.splashScreen.hide();
      }

      this._geolocationService.obtenerUbicacion();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}
