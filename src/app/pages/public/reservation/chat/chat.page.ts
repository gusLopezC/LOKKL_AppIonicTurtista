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

  roomkey: string;
  nickname: string;
  chatMessage: string;

  chats = [];
  offStatus = false;
  reserva: any;

  // @ViewChild(Content) content: Content;

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

    this.chatService.getChatRooms().subscribe(chats => {
      console.log(chats);
      // this.chatRooms = chats;

    });



  }//end ngOnit


  exitChat() {
    // this.sendExitMessage();
    this.offStatus = true;
    this.location.back();
  }

  sendExitMessage() {
    this.sendMessage('exit', this.nickname + ' has exited this room.');
  }

  sendMessage(type: string, message: string) {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: type,
      user: this.nickname,
      message: message,
      sendDate: Date()
    });
  }

}
