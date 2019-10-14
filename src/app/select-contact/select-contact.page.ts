import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MessageService } from '../services/message.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.page.html',
  styleUrls: ['./select-contact.page.scss'],
})
export class SelectContactPage implements OnInit {

  constructor(
    private helper: HelperService,
    private messageService: MessageService,
  ) { }

  users;
  ngOnInit() {
  }


  ionViewWillEnter() {
    this.getUsers()
  }
  close() {
    this.helper.closeModal()
  }
  getUsers() {
    firebase.firestore().collection("users").onSnapshot((userSnap) => {
      let users = [];
      userSnap.forEach((user) => {
        if (!this.checkIfUserAlreadySelected(user.data())) {
          users.push(user.data())
        }
      })
      this.users = users;
    })
  }

  selectContact(user) {
    this.messageService.recipients.push(user);
    this.helper.closeModal();
  }

  checkIfUserAlreadySelected(user) {
     let index = this.messageService.recipients.findIndex(u => u.uid == user.uid);
     return (index > -1) ? true : false;
  }

  write(x){
    console.log(x)
  }
}
