import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/service.index';
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage{

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  constructor(public _dataLocalService: DataLocalService) { }

}
