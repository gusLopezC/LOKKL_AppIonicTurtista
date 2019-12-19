import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { TourService, ToursciudadService } from 'src/app/services/service.index';
import { NetworkService, ConnectionStatus } from '../../../services/network/network.service';
import { Tours } from '../../../models/tour.model';

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

  constructor(
    // tslint:disable-next-line: variable-name
    private _toursServices: TourService,
    private _toursciudadService: ToursciudadService,
    private _networkService: NetworkService,
    public loadingController: LoadingController,
    private router: Router, ) {
  }

  async ngOnInit() {
    this.cargarTours();
    this.obtenerToursMexico();
    this.obtenerToursPeru();

  }

  /**
   * Declarar los metodos la busqueda
   */

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
  /**
   * Obtener Tours
   */

  async cargarTours() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this._toursServices.obtenerToursNuevos()
      .subscribe(resp => {
        // this.tours = resp.Tour;
        this.tours.push(...resp.Tour);
        loading.dismiss();
      });
  }

  obtenerToursPeru() {
    this._toursciudadService.obtenerToursCiudad('Perú')
      .subscribe(resp => {
        // this.tours = resp.Tour;
        this.toursPeru.push(...resp.Tour);
      });
  }
  obtenerToursMexico() {
    this._toursciudadService.obtenerToursCiudad('Mexico')
      .subscribe(resp => {
        // this.tours = resp.Tour;
        this.toursMexico.push(...resp.Tour);
      });
  }
}
