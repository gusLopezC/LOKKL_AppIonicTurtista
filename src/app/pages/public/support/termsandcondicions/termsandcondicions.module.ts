import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TermsandcondicionsPage } from './termsandcondicions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsandcondicionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsandcondicionsPage]
})
export class TermsandcondicionsPageModule {}
