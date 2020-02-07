import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService, TourService } from 'src/app/services/service.index';
import { Storage } from '@ionic/storage';

import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tours } from '../../../../models/tour.model';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-tourdetalles',
  templateUrl: './tourdetalles.page.html',
  styleUrls: ['./tourdetalles.page.scss'],
})
export class TourdetallesPage implements OnInit {

  guia: Usuario;
  tour: Tours;
  resumenSchedulle: string[];
  estrella = 'ios-heart-empty';

  constructor(
    private _tourService: TourService,
    private _dataLocalService: DataLocalService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private socialSharing: SocialSharing,
    private storage: Storage,
    private location: Location,
    private router: Router

  ) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tour = this.router.getCurrentNavigation().extras.state.tour;
      }
    });
  }

  async ngOnInit() {

    this._dataLocalService.existeEnFavoritos(this.tour.slug)
      .then(existe => this.estrella = (existe) ? 'ios-heart' : 'ios-heart-empty');

    this.obtenerTour();
  }


  async obtenerTour() {

    this._tourService.obtenerTour(this.tour.slug)
      .subscribe(resp => {
        resp.Tour.itinerary = JSON.parse(resp.Tour.itinerary);
        resp.Tour.whatsIncluded = JSON.parse(resp.Tour.whatsIncluded);
        this.guia = resp.Guia[0];
        this.tour = resp.Tour;
        this.obtenerDescriptionResumia(this.tour.schedulle);
      });

  }

  reservarTour() {
    let navigationExtras: NavigationExtras = {
      state: {
        tour: this.tour,
      }
    };
    this.router.navigate(['/calender'], navigationExtras);
  }


  compartir() {
    this.socialSharing.share(
      'Conoce el tour' + this.tour.name,
      this.tour.schedulle,
      '',
      'https://lokkl.com/tour/' + this.tour.slug
    );
  }

  agregarFavoritos() {
    const existe = this._dataLocalService.guardarTour(this.tour);
    this.estrella = (existe) ? 'ios-heart' : 'ios-heart-empty';
  }

  obtenerDetallesTour(section: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        tour: this.tour,
        section: section
      }
    };
    this.router.navigate(['/tourdescripcion'], navigationExtras);
  }

  obtenerDescriptionResumia(resumenschedulle: string) {
    const separador = '</p>'; // busca dos parrafos
    const limite = 2;
    this.resumenSchedulle = resumenschedulle.split(separador, limite);

  }

  myBackButton() {
    this.location.back();
  }
}
