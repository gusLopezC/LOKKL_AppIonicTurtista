import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { LoginemailPage } from './loginemail.page';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';

const routes: Routes = [
  {
    path: '',
    component: LoginemailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  declarations: [
    LoginemailPage,
    RecoverypasswordComponent,
  ],
  exports: [
    RecoverypasswordComponent,
  ],
  entryComponents: [
    RecoverypasswordComponent,
  ],
})
export class LoginemailPageModule {}
