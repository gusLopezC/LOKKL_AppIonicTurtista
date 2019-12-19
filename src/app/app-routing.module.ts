import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/public/tabs/tabs.module#TabsPageModule' },

  // Login
  { path: 'welcome', loadChildren: './pages/login/welcome/welcome.module#WelcomePageModule' },
  { path: 'login', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  { path: 'loginemail', loadChildren: './pages/login/loginemail/loginemail.module#LoginemailPageModule' },
  { path: 'register', loadChildren: './pages/login/register/register.module#RegisterPageModule' },

  // Tour
  { path: 'tourdetalles', loadChildren: './pages/public/tour/tourdetalles/tourdetalles.module#TourdetallesPageModule' },
  { path: 'tourdescripcion', loadChildren: './pages/public/tour/descripcion/descripcion.module#DescripcionPageModule' },
  { path: 'searchtour', loadChildren: './pages/public/tour/search-tour/search-tour.module#SearchTourPageModule' },
  { path: 'comentary/slug', loadChildren: './pages/public/tour/comentary/comentary.module#ComentaryPageModule' },

  // Payment
  { path: 'calender', loadChildren: './pages/public/payment/calender/calender.module#CalenderPageModule' },
  { path: 'facturacion', loadChildren: './pages/public/payment/facturacion/facturacion.module#FacturacionPageModule' },
  { path: 'payment', loadChildren: './pages/public/payment/payment/payment.module#PaymentPageModule' },

  // Perfil
  { path: 'comofunciona', loadChildren: './pages/public/profile/como-funciona/como-funciona.module#ComoFuncionaPageModule' },
  { path: 'editprofile', loadChildren: './pages/public/profile/editprofile/editprofile.module#EditprofilePageModule' },


  // Soporte
  // tslint:disable-next-line: max-line-length
  { path: 'termsandcondicions', loadChildren: './pages/public/support/termsandcondicions/termsandcondicions.module#TermsandcondicionsPageModule' },
  { path: 'help', loadChildren: './pages/public/support/help/help.module#HelpPageModule' },

  // Reservas
  { path: 'chat', loadChildren: './pages/public/reservation/chat/chat.module#ChatPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'cancel-reservation', loadChildren: './pages/public/reservation/cancel-reservation/cancel-reservation.module#CancelReservationPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
