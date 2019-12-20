import { Component, OnInit } from '@angular/core';
import { NetworkService, GeolocationService, DataLocalService } from 'src/app/services/service.index';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  Conexion: boolean;
  NoConexion: boolean;
  MostrarVistaBienvenida = false;
  MostrarVistaGeocalizacion = false;
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private _networkService: NetworkService,
    private _dataLocalService: DataLocalService) {
  }

  ngOnInit() {
    // this.obtenerTipoDeVista();
  }

  /*obtenerTipoDeVista(refresher?) {
    this.revisarConexion().then((valido) => {
      if (valido) {
        this._dataLocalService.obtenerUbicacion().then((result) => {
          if (result) {
            this.MostrarVistaGeocalizacion = true;
            this.MostrarVistaBienvenida = false;
          } else {
            this.MostrarVistaGeocalizacion = false;
            this.MostrarVistaBienvenida = true;
          }
        });
      } else {
        this.NoConexion = true;
      }

    });
    if (refresher) {
      refresher.target.complete();
    }
  }*/

  async revisarConexion() {
    let result;
    return result = await this._networkService.revisarConexion();
  }
}
