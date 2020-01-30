import { Component, OnInit, ViewChild } from '@angular/core';
import { TourService } from '../../../services/service.index';
import { Router, NavigationExtras } from '@angular/router';
import { Tours } from '../../../models/tour.model';


@Component({
  selector: 'app-scrollinfinitetour',
  templateUrl: './scrollinfinitetour.component.html',
  styleUrls: ['./scrollinfinitetour.component.scss'],
})
export class ScrollinfinitetourComponent {

  dataList: any;
  numberPagination = 1;
  numberPaginationTotal: number;
  tours: Tours[] = [];


  constructor(
    private _toursServices: TourService,
    private router: Router,
  ) {
    this.dataList = [];
    this._toursServices.obtenerTourScrollInfinite(this.numberPagination)
      .subscribe(resp => {
        this.numberPaginationTotal = resp.Tour.last_page;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < resp.Tour.data.length; i++) {
          this.dataList.push(resp.Tour.data[i]);
        }
        this.numberPagination++;
      });
  }

  loadData(event) {

    if (this.numberPagination > this.numberPaginationTotal) {
      event.target.complete();
      event.target.disabled = true;
      return false;
    }

    setTimeout(() => {
      console.log('Done');
      this._toursServices.obtenerTourScrollInfinite(this.numberPagination)
        .subscribe(resp => {
          this.numberPaginationTotal = resp.Tour.last_page;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < resp.Tour.data.length; i++) {
            this.dataList.push(resp.Tour.data[i]);
          }
          this.numberPagination++;
        });
      event.target.complete();
    }, 1000);
  }


  async abrirTour(tour: Tours) {

    let navigationExtras: NavigationExtras = {
      state: {
        tour: tour,
      }
    };
    this.router.navigate(['/tourdetalles'], navigationExtras);
  }

}
