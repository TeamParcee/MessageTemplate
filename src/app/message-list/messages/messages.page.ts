import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }


  user;
  messages;
  messageListId;
  text;
  async ionViewWillEnter() {
    await this.getUser();
    this.getMessages();
  }
  async getUser() {
    this.user = await this.userService.getUser();
  }
  getMessages() {
    if (this.messageListId) {
      firebase.firestore().collection("/users/" + this.user.uid + "/messageList/" + this.messageListId + "messages")
        .onSnapshot((messagesSnap) => {
          let messages = [];
          messagesSnap.forEach((message) => {
            messages.push(message.data())
          })
          this.messages = messages;
        })
    } else {
      this.messages = []
    }
  }

  sendMessage() {
    let message = {
      text: this.text,
      created: new Date(),
      new: true
    }
    if (this.messageListId) {
      this.messageService.sendMesage(this.messageListId, message).then(() => {
        this.text = ""
      })
    }
  }

  close() {
    this.helper.closeModal()
  }
}
