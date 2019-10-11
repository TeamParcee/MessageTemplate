import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase';
import { HelperService } from '../services/helper.service';
import { MessagesPage } from './messages/messages.page';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }

  user;
  messageLists;

  async ionViewWillEnter() {
    await this.getUser();
    this.getMessageList();
    this.getUserFromUid();
  }
  async getUser() {
    this.user = await this.userService.getUser();
    console.log(this.user.uid);
  }
  getMessageList() {
    firebase.firestore().collection("/users/" + this.user.uid + "/messageList").onSnapshot((messageListsSnap) => {
      let messageLists = [];
      messageListsSnap.forEach((messageList) => {
        messageLists.push(messageList.data())
      })
      this.messageLists = messageLists;
    })
  }
  viewMessages(recipients) {
    this.helper.openModal(MessagesPage, { recipients: recipients })
  }

  newMessage() {
    this.helper.openModal(MessagesPage, null)
  }
  async getUserFromUid() {

    let user: any = await this.userService.getUserFromUid(this.user.uid)
    console.log(user);

  }
}
