import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/service.index';
import { Location } from '@angular/common';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  estrella = 'ios-heart-empty';
  data: any;
  section: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataLocalService: DataLocalService,
    private socialSharing: SocialSharing,
    private location: Location,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.tour;
        this.section = this.router.getCurrentNavigation().extras.state.section;
      }
    });
  }
  ngOnInit() {
    this.scrollTo(this.section);
  }

  scrollTo(elementId: string) {
    setTimeout(() => {
      let y = document.getElementById(elementId).offsetTop;
      this.content.scrollToPoint(0, y);
    }, 1000);
  }

  compartir() {
    this.socialSharing.share(
      'Conoce el tour' + this.data.name,
      this.data.schedulle,
      '',
      'https://lokkl.com/tour/' + this.data.slug
    );
  }

  agregarFavoritos() {
    const existe = this._dataLocalService.guardarTour(this.data);
    this.estrella = (existe) ? 'ios-heart' : 'ios-heart-empty';
  }

  myBackButton() {
    this.location.back();
  }


  reservarTour() {
    let navigationExtras: NavigationExtras = {
      state: {
        tour: this.data,
      }
    };
    this.router.navigate(['/calender'], navigationExtras);
  }

}
