import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { TourService, ToursciudadService, DataLocalService } from 'src/app/services/service.index';
import { NetworkService, ConnectionStatus } from '../../../services/network/network.service';
import { Tours } from '../../../models/tour.model';



declare var google: any;

@Component({
  selector: 'app-tours-geolocation',
  templateUrl: './tours-geolocation.component.html',
  styleUrls: ['./tours-geolocation.component.scss'],
})
export class ToursGeolocationComponent implements OnInit {

  public DatosGeolocation: any;
  public search = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  tours: Tours[] = [];

  imagenfondo: any;
  Existentours: boolean;
  NoExistentours: boolean;
  InfoObtenida = false;
  Conexion = false;
  NoConexion = false;

  constructor(
    private _toursService: TourService,
    private _networkService: NetworkService,
    private _dataLocalService: DataLocalService,
    private router: Router, ) {
    this._dataLocalService.obtenerUbicacion().then((result) => {
      this.DatosGeolocation = result;
      this.buscarTours(this.DatosGeolocation.place_id);
      this.InfoObtenida = true;
    });
  }

  ngOnInit() {

  }

  buscar() {
    if (!this.search.trim().length) { return; }
    const options = {
      input: this.search,
      types: ['(cities)'],
    };
    this.googleAutocomplete.getPlacePredictions(options, predictions => {
      this.searchResults = predictions[0];
    });
  }

  selectSearchResult(item: any) {
    this.search = '';
    let navigationExtras: NavigationExtras = {
      state: {
        item: item,
      }
    };
    this.router.navigate(['/searchtour'], navigationExtras);

  }

  async buscarTours(placeID: string, refresher?) {
    this.revisarConexion().then((valido) => {
      if (valido) {
        this._toursService.buscarPorCiudad(placeID)
          .subscribe(resp => {
            console.log(resp);
            this.Conexion = true;
            if (resp.Tour.length > 0) {
              this.tours = resp.Tour;
              this.imagenfondo = resp.TourExtra.foto;
              this.Existentours = true;
              this.NoExistentours = false;

            } else {
              this.imagenfondo = resp.TourExtra.foto;
              this.Existentours = false;
              this.NoExistentours = true;
            }

          });
      } else {
        console.log('No hay conexion');
        this.NoConexion = true;
      }
    });
    if (refresher) {
      refresher.target.complete();
    }
  }

  async revisarConexion() {
    return await this._networkService.revisarConexion();
  }

}
