import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { EditprofilePage } from './editprofile.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from '../../../../components/components.module';
//import { ModalCargarPage } from '../../../../components/profile/documentvalidation/modal-cargar/modal-cargar.page';


const routes: Routes = [
  {
    path: '',
    component: EditprofilePage
  }
];

@NgModule({

  imports: [
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  declarations: [EditprofilePage,]
})
export class EditprofilePageModule { }
