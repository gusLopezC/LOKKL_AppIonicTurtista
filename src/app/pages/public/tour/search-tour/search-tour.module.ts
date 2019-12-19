import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchTourPage } from './search-tour.page';
import { ComponentsModule } from '../../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: SearchTourPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchTourPage]
})
export class SearchTourPageModule { }
