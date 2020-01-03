import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import { ImagenesFondo } from './imagenesfondo';


declare var google: any;


@Component({
  selector: 'app-slidessearch',
  templateUrl: './slidessearch.component.html',
  styleUrls: ['./slidessearch.component.scss'],
})
export class SlidessearchComponent {

  @ViewChild('IonSlides', { static: true }) slider: IonSlides;

  public search = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults: any = {};
  public Fondo = ImagenesFondo;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 1000,
    autoplay: true,
  };

  constructor(private router: Router, ) {
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
    this.googleAutocomplete.getPlacePredictions(options, (predictions: any) => {
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

}
