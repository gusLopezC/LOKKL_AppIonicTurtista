import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

import { ChatService } from '../../../../services/service.index';
import * as firebase from 'firebase';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  reserva: any;

  roomkey: string;

  userId = '';
  message: string;
  messages = [];
  chats = [];

  constructor(
    private chatService: ChatService,
    public navCtrl: NavController,
    private location: Location,
    public route: ActivatedRoute,
    private router: Router, ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reserva = this.router.getCurrentNavigation().extras.state.reserva;
        console.log(this.reserva);
      }
    });
  }

  ngOnInit() {

  }// end ngOnit


  exitChat() {
    // this.sendExitMessage();
    this.location.back();
  }



  sendMessage(type: string, message: string) {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: type,
      user: this.userId,
      message: message,
      sendDate: Date()
    });
  }

  sendChatMessage() {

  }

}
