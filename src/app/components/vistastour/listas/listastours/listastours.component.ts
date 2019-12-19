import { Component, OnInit, Input } from '@angular/core';
import { Tours } from '../../../../models/tour.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-listastours',
  templateUrl: './listastours.component.html',
  styleUrls: ['./listastours.component.scss'],
})
export class ListastoursComponent implements OnInit {

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
