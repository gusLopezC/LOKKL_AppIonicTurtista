import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Componentes
import { ToursComponent } from './vistastour/slides/tours/tours.component';
import { ListastoursComponent } from './vistastour/listas/listastours/listastours.component';
import { AboutusComponent } from './profile/aboutus/aboutus.component';
import { StarsComponent } from './tour/stars/stars.component';
import { PipesModule } from '../pipes/pipes.module';
import { ChangePasswordComponent } from './profile/editprofie/change-password/change-password.component';
import { ToursWelcomeComponent } from './home/tours-welcome/tours-welcome.component';
import { ReservasActivasComponent } from './reservas/reservas-activas/reservas-activas.component';
import { SlidessearchComponent } from './home/slidessearch/slidessearch.component';
import { ScrollinfinitetourComponent } from './vistastour/scrollinfinitetour/scrollinfinitetour.component';
import { MosaicoComponent } from './home/mosaico/mosaico.component';

import { ModalComponent } from './profile/documentvalidation/modal/modal.component';


@NgModule({
  entryComponents: [
    AboutusComponent,
    StarsComponent,
    ChangePasswordComponent,
    ModalComponent
  ],
  declarations: [
    ScrollinfinitetourComponent,
    MosaicoComponent,
    SlidessearchComponent,
    ToursWelcomeComponent,
    ToursComponent,
    ListastoursComponent,
    AboutusComponent,
    StarsComponent,
    ChangePasswordComponent,
    ReservasActivasComponent,
    ModalComponent

  ],
  exports: [
    ScrollinfinitetourComponent,
    MosaicoComponent,
    SlidessearchComponent,
    ToursWelcomeComponent,
    ToursComponent,
    ListastoursComponent,
    StarsComponent,
    ChangePasswordComponent,
    ReservasActivasComponent,
    ModalComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ]
})
export class ComponentsModule { }
