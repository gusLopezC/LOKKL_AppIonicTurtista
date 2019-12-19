import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {

  public datePickerDate;
  public endPickerDate;
  public datePickerFormattedDate;
  public datePickerObj;

  fechaReserva: any = null;
  numberTuristias = 1;
  tour: any;
  precioredondo: any;
  fechaCalender: any;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public toastController: ToastController,
  ) {
    this.datePickerDate = moment(this.datePickerDate).format('LL');
    this.endPickerDate = moment(this.datePickerDate).add(24, 'M');
    moment.locale('en');
    this.datePickerFormattedDate = moment(this.datePickerDate).format('DD MMMM YYYY');
    this.datePickerObj = this.datePickerConfiguration(
      this.datePickerDate,
      this.endPickerDate,
      this.datePickerDate);

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tour = this.router.getCurrentNavigation().extras.state.tour;
      }
    });
  }

  ngOnInit() {
    this.precioredondo = this.tour.price;
  }

  public onCalendarChange($event) {
    this.fechaCalender = $event.detail.value;
    this.fechaReserva = moment(this.fechaCalender).format('YYYY-MM-DD');
  }

  async pagarTour() {
    if (this.fechaReserva == null) {
      const toast = await this.toastController.create({
        message: 'Selecciona una fecha para reservar',
        color: 'danger',
        duration: 2000
      });
      toast.present();
      return false;
    }
    let navigationExtras: NavigationExtras = {
      state: {
        tour: this.tour,
        fechaCalender: this.fechaCalender,
        fechaReserva: this.fechaReserva,
        numberTuristias: this.numberTuristias

      }
    };
    this.router.navigate(['/facturacion'], navigationExtras);
  }

  increment() {
    this.numberTuristias++;
    this.precioredondo = this.tour.price * this.numberTuristias;
  }

  decrement() {
    if (this.numberTuristias === 1) { return null; }
    this.numberTuristias--;
    this.precioredondo = this.tour.price * this.numberTuristias;
  }

  myBackButton() {
    this.location.back();
  }

  /**
   *
   * Configuracion Datepicker
   *
   */
  private datePickerConfiguration(beginDate: Date, endDate: Date, currentDate: Date) {
    const disabledDates: Date[] = [
    ];
    const datePickerObj: any = {
      inputDate: currentDate, // default new Date()
      fromDate: beginDate, // default null
      toDate: endDate, // default null
      showTodayButton: false, // default true
      closeOnSelect: true, // default false
      disableWeekDays: [], // default []
      mondayFirst: true, // default false
      disabledDates: disabledDates, // default []
      titleLabel: 'Select a date', // default null
      dateFormat: 'DD MMMM YYYY', // default DD MMM YYYY
      clearButton: false, // default true
      momentLocale: 'en-US', // Default 'en-US' - es-ES
      yearInAscending: false, // Default false
      btnCloseSetInReverse: true, // Default false
      btnProperties: {
        expand: 'block', // Default 'block'
        fill: '', // Default 'solid'
        size: '', // Default 'default'
        disabled: '', // Default false
        strong: '', // Default false
        color: '' // Default ''
      },
      arrowNextPrev: {
        // nextArrowSrc: 'assets/images/arrow_right.svg',
        // prevArrowSrc: 'assets/images/arrow_left.svg'
      }, // This object supports only SVG files.
      highlightedDates: []  // Default []
    };

    return datePickerObj;
  }
}
