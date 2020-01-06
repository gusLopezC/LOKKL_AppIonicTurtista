import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { TourService, ToursciudadService } from 'src/app/services/service.index';
import { NetworkService, ConnectionStatus } from '../../../services/network/network.service';
import { Tours } from '../../../models/tour.model';
import { DataLocalService } from '../../../services/datalocal/data-local.service';

declare var google: any;


@Component({
  selector: 'app-tours-welcome',
  templateUrl: './tours-welcome.component.html',
  styleUrls: ['./tours-welcome.component.scss'],
})
export class ToursWelcomeComponent implements OnInit {

  /**
   * Propiedades
   */
  public search = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  tours: Tours[] = [];
  toursPeru: Tours[] = [];
  toursMexico: Tours[] = [];
  NoConexion = false;
  Conexion: boolean;
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    // tslint:disable-next-line: variable-name
    private _toursServices: TourService,
    private _toursciudadService: ToursciudadService,
    private _dataLocalService: DataLocalService,
    private _networkService: NetworkService,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private router: Router, ) {

  }

  async ngOnInit() {
    this.cargarTours();

  }

  /**
   * Declarar los metodos la busqueda
   */

  selectSearchResult(item: any) {
    this.search = '';
    let navigationExtras: NavigationExtras = {
      state: {
        item: item,
      }
    };
    this.router.navigate(['/searchtour'], navigationExtras);

  }
  /**
   * Obtener Tours
   */

  async cargarTours() {
    this.NoConexion = false;
    this.Conexion = false;

    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();

    this._toursServices.obtenerToursNuevos()
      .subscribe(resp => {
        this.tours.push(...resp.Tour);
        this.Conexion = true;
        loading.dismiss();
      }, (err => {
        loading.dismiss();
        this.NoConexion = true;
        return false;
      }));
    loading.dismiss();
  }



  buscarporGeolocation() {
    this._dataLocalService.obtenerUbicacion().then((result) => {
      this.abriCiudad(result.description);
    })
      .catch(error => console.log(error));
  }
  /**
   * Abrir CIUDAD
   */

  abriCiudad(ciudad: string) {
    const options = {
      input: ciudad,
      types: ['(cities)'],
    };
    this.googleAutocomplete.getPlacePredictions(options, async predictions => {
      if (predictions == null) {
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'A ocurrido un error vuelve a intentar.',
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        });

        toast.present();
        return false;
      }

      this.selectSearchResult(predictions[0]);
    }, (err => {
    }));
  }

  async revisarConexion() {
    let result;
    return result = await this._networkService.revisarConexion();
  }


}
