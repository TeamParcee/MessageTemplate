import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SelectContactPage } from 'src/app/select-contact/select-contact.page';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private helper: HelperService,
    private messageService: MessageService,
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) { }

  recipients;
  text;
  messageId;
  messagesRef = "/users/" + this.firebaseService.user.uid + "/messageLists/";
  messages;

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.recipients = this.messageService.recipients;
    this.getMessageId();
  }
  ionViewWillLeave() {
    this.recipients = this.messageService.recipients = [];
  }
  close() {
    this.helper.closeModal();
  }
  viewContacts() {
    this.helper.openModalPromise(SelectContactPage, null).then(() => {
      this.getMessageId()
    })
  }
  removeUser(user) {
    this.messageService.removeUserAsRecipient(user);
    this.getMessageId();
  }

  checkIfMultipleRecipients(recipients) {
    if (recipients.length > 1) {
      return recipients[0].name + " & " + (recipients.length - 1) + " more"
    } else {
      return recipients[0].name
    }
  }

  sendMessage() {
    this.messageService.createMessageList(this.messageId, {
      created: new Date().toUTCString(),
      recipients: this.recipients,
      lastMessage: this.text,
    }).then(() => {
      this.messageService.sendMesage(this.messageId, {
        created: new Date().toUTCString(),
        new: true,
        text: this.text,
      })
      this.text = "";
    })

  }


  getMessageId() {
    this.messageService.getMessageId(this.messageService.getRecipientsUids(this.recipients)).then((id) => {
      this.messageId = id;
      this.getMessages();
    })

  }

  async getMessages() {

    this.messages = [];
    await firebase.firestore().collection(this.messagesRef + this.messageId + "/messages/").onSnapshot((messagesSnap) => {
      if (messagesSnap.empty) {
        this.messages = [];

      } else {
        let messages = [];
        messagesSnap.forEach((message) => {
          messages.push(message.data())
        })
        this.messages = messages;
      }

    })
  }

  selectContact() {
    this.helper.openModal(SelectContactPage, null)
  }
}
