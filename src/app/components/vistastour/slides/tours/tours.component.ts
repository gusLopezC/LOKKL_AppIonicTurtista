import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Tours } from '../../../../models/tour.model';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {

  @Input() tours: Tours[] = [];

  constructor(public router: Router) { }

  ngOnInit() { }

  async abrirTour(tour: Tours) {

    let navigationExtras: NavigationExtras = {
      state: {
        tour: tour,
      }
    };
    this.router.navigate(['/tourdetalles'], navigationExtras);
  }

}
