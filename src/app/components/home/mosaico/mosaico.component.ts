import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-mosaico',
  templateUrl: './mosaico.component.html',
  styleUrls: ['./mosaico.component.scss'],
})
export class MosaicoComponent implements OnInit {

  constructor(
    private iab: InAppBrowser,
  ) { }

  ngOnInit() { }


  onClick(url) {
    const browser = this.iab.create(url);

  }


}
