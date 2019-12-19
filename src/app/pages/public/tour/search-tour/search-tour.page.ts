import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tours } from '../../../../models/tour.model';
import { TourService } from 'src/app/services/service.index';
import { LoadingController } from '@ionic/angular';
import { NetworkService } from '../../../../services/network/network.service';

declare var google: any;

@Component({
  selector: 'app-search-tour',
  templateUrl: './search-tour.page.html',
  styleUrls: ['./search-tour.page.scss'],
})
export class SearchTourPage implements OnInit {

  public search = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  data: any;
  // ---
  tours: Tours;
  imagenfondo: any;
  Existentours: boolean;
  NoExistentours: boolean;
  Conexion = false;
  NoConexion = false;

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _toursService: TourService,
    private _networkService: NetworkService,
    private loadingController: LoadingController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.item;
      }
    });
  }

  ngOnInit() {
    this.buscarTours(this.data.place_id);
  }

  async buscarTours(placeID: string, refresher?) {
    this.revisarConexion().then((valido) => {
      if (valido) {
        this._toursService.buscarPorCiudad(placeID)
          .subscribe(resp => {
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
  /**
   * Metodos para la busqueda
   */

  buscar() {
    if (!this.search.trim().length) { return; }
    let options = {
      input: this.search,
      types: ['(cities)'],
    };
    this.googleAutocomplete.getPlacePredictions(options, predictions => {
      this.searchResults = predictions[0];
    });
  }


  selectSearchResult(item: any) {
    this.search = '';
    console.log(item.place_id);
    this.buscarTours(item.place_id);
  }

  async revisarConexion() {
    return await this._networkService.revisarConexion();
  }

}
