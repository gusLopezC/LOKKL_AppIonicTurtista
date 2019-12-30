import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SearchTourPage } from './search-tour.page';
import { ComponentsModule } from '../../../../components/components.module';
import { PipesModule } from '../../../../pipes/pipes.module';


const routes: Routes = [
  {
    path: '',
    component: SearchTourPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  declarations: [SearchTourPage]
})
export class SearchTourPageModule { }
