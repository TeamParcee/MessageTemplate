import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) { }

  recipients = [];



  getMessageId() {
    return new Promise((resolve) => {
      return resolve(firebase.firestore().collection("/users/" + this.userService.user.uid + "/messageLists").doc().id)
    })
  }

  createMessageList(messageListId, messageList) {
    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + this.userService.user.uid + "/messageLists/" + messageListId, messageList)
        .then(() => {
          return resolve()
        })
    })
  }
  sendMesage(messageListId, message) {
    return new Promise((resolve) => {
      this.firebaseService.addDocument("/users/" + this.userService.user.uid + "/messageLists/" + messageListId + "/messages/", message)
        .then(() => {
          return resolve()
        })
    })
  }
  deleteMessage(messageListId, messageId) {
    return new Promise((resolve) => {
      this.firebaseService.deleteDocument("/users/" + this.userService.user.uid + "/messageLists/" + messageListId + "/messages/" + messageId)
        .then(() => {
          return resolve()
        })
    })
  }

}
