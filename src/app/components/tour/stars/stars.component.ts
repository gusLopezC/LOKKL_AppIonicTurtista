import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

  // @Input() rating;
  rating_n: number;
  color: string;
  array_star: string[];

  constructor() { }

  ngOnInit() { }

  @Input() set rating(rating: any) {
    let max_rate = 5;
    let rounded_rating = Math.round(rating);
    let array_stars = new Array(max_rate);
    array_stars.fill('star-outline');

    for (let i = 0; i < rounded_rating; i++) {
      array_stars[i] = 'star';
      if (i === rounded_rating - 1 && rating % 1 !== 0) {
        array_stars[i] = 'star-half';
      }
    }
    this.array_star = array_stars;
  }

  get rating() {
    return this.rating_n;
  }

}
