import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { EmergenciaPage } from './emergencia.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from '../../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: EmergenciaPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),

  ],
  declarations: [EmergenciaPage]
})
export class EmergenciaPageModule { }
