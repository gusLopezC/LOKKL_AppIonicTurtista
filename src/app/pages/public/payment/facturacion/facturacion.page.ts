import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit {

  facturacionform: FormGroup;
  tour: any;
  fechaReserva: Date;
  numberTuristias: number;
  fechaCalender: any;
  Horaprupuesta: any;
  priceFinal: any;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tour = this.router.getCurrentNavigation().extras.state.tour;
        this.fechaReserva = this.router.getCurrentNavigation().extras.state.fechaReserva;
        this.fechaCalender = this.router.getCurrentNavigation().extras.state.fechaCalender;
        this.Horaprupuesta = this.router.getCurrentNavigation().extras.state.Horaprupuesta;
        this.numberTuristias = this.router.getCurrentNavigation().extras.state.numberTuristias;
      }

    });

    // Formulario
    this.facturacionform = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      telephone: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  ngOnInit() {
  }


  guardar() {
    let navigationExtras: NavigationExtras = {
      state: {
        tour: this.tour,
        fechaCalender: this.fechaCalender,
        fechaReserva: this.fechaReserva,
        Horaprupuesta: this.Horaprupuesta,
        numberTuristias: this.numberTuristias,
        name: this.facturacionform.value.name,
        email: this.facturacionform.value.email,
        telephone: this.facturacionform.value.telephone
      }
    };
    this.router.navigate(['/payment'], navigationExtras);
  }


  myBackButton() {
    this.location.back();
  }
}
