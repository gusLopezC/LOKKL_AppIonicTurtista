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
  }

}
