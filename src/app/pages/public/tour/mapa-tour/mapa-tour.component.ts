import { Component, NgZone, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition,
  MarkerOptions, Marker, Environment, MyLocation
} from '@ionic-native/google-maps';

declare var google: any;
@Component({
  selector: 'app-mapa-tour',
  templateUrl: './mapa-tour.component.html',
  styleUrls: ['./mapa-tour.component.scss'],
})
export class MapaTourComponent implements OnInit {


  @ViewChild('map', { static: true }) mapElement: any;
  @Input() coordenadas: string;
  private loading: any;
  private map: GoogleMap;
  mapaGoogleLat: number;
  mapaGoogleLon: number;


  constructor(
    private platform: Platform,
    public loadingController: LoadingController) {
  }

  ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = this.platform.width + 'px';
    this.mapElement.style.height = '200' + 'px';

    this.loadMap();
  }


  async loadMap() {
    this.loading = await this.loadingController.create({
      message: 'Por favor espere'
    });
    await this.loading.present();

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAioR39TAyFp6nIBvQGDdcl0Q10TaoMXjw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAioR39TAyFp6nIBvQGDdcl0Q10TaoMXjw'
    });

    let mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false,
      },
      gestures: {
        rotate: false,
        tilt: false,
        scroll: false
      }
    };

    this.map = GoogleMaps.create(this.mapElement, mapOptions);
    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.addOriginMarker();
    } catch (error) {
      console.log(error);
    }

  }
  async addOriginMarker() {

    let cordenada = this.coordenadas.split(',');
    this.mapaGoogleLat = +cordenada[0];
    this.mapaGoogleLon = +cordenada[1];

    try {
      const myLocation: MyLocation = await this.map.getMyLocation();
      await this.map.moveCamera({
        target: {
          lat: this.mapaGoogleLat,
          lng: this.mapaGoogleLon
        },
        zoom: 14
      });

      this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.mapaGoogleLat,
          lng: this.mapaGoogleLon
        }

      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

}
