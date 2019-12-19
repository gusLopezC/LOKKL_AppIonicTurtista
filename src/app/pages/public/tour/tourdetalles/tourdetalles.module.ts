import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { TourdetallesPage } from './tourdetalles.page';
import { ComponentsModule } from '../../../../components/components.module';
import { MapaTourComponent } from '../mapa-tour/mapa-tour.component';
import { PipesModule } from '../../../../pipes/pipes.module';



const routes: Routes = [
  {
    path: '',
    component: TourdetallesPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [TourdetallesPage, MapaTourComponent]
})
export class TourdetallesPageModule { }
