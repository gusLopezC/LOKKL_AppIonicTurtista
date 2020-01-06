import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

declare var google: any;

// https://github.com/sebastianbaar/cordova-plugin-nativegeocoder
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  optionsGeo: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  private googleAutocomplete;
  public searchResults = new Array<any>();

  constructor(
    public zone: NgZone,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private storage: Storage) {
    this.setGoogleAutocomplete();
  }


  setGoogleAutocomplete() {
    console.log(google.maps);
    if (google.maps) {
      this.googleAutocomplete = new google.maps.places.AutocompleteService();

    } else {
      console.log('No existe Google');
    }

  }


  obtenerUbicacion() {
    this.geolocation.getCurrentPosition().then((response) => {
      // Print response
      // console.log('Latitude: ', response.coords.latitude + 'Longitude: ', response.coords.longitude);
      this.obtenerDatosCiudad(response.coords.latitude, response.coords.longitude)
      // Handle errors
    }).catch((error) => {
      console.error(error);
    });
  }

  obtenerDatosCiudad(latitud: number, logintud: number) {
    this.nativeGeocoder.reverseGeocode(latitud, logintud, this.optionsGeo)
      .then((result: NativeGeocoderResult[]) => {
        this.obtenerSlugCiudad(result[0].administrativeArea);
      })
      .catch((error: any) => console.log(error));
  }

  /*obtenerCoordenadasCiudad() {
    this.nativeGeocoder.forwardGeocode('Santiago de Queretaro', this.optionsGeo)
      .then((result: NativeGeocoderResult[]) =>
        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
      .catch((error: any) => console.log(error));
  }*/

  obtenerSlugCiudad(ciudad: string) {
    /* if (ciudad.trim().length) { return; }*/
    const options = {
      input: ciudad,
      types: ['(cities)'],
    };
    this.googleAutocomplete.getPlacePredictions(options, predictions => {
      this.searchResults = predictions[0];
      this.storage.set('Location', this.searchResults);
    });
  }
}
