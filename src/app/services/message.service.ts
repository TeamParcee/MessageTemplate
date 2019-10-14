import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { resolve } from 'path';

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






  createMessageList(messageListId, messageList) {
    return new Promise(async (resolve) => {
      let user: any = await this.userService.getUser();
      this.firebaseService.setDocument("/users/" + user.uid + "/messageLists/" + messageListId, messageList)
        .then(() => {
          return resolve()
        })
    })
  }
  sendMesage(messageListId, message) {
    return new Promise(async (resolve) => {
      let user: any = await this.userService.getUser();
      this.firebaseService.addDocument("/users/" + user.uid + "/messageLists/" + messageListId + "/messages", message)
        .then(() => {
          return resolve()
        })
    })
  }
  deleteMessage(messageListId, messageId) {
    return new Promise(async (resolve) => {
      let user: any = await this.userService.getUser();
      this.firebaseService.deleteDocument("/users/" + user.uid + "/messageLists/" + messageListId + "/messages" + messageId)
        .then(() => {
          return resolve()
        })
    })
  }
  removeUserAsRecipient(user) {
    let index = this.recipients.findIndex(u => user.uid == u.uid);
    this.recipients.splice(index, 1);
  }

  async getMessageId(recipientsUids: any[]) {
    let user: any = await this.userService.getUser();
    let newId = firebase.firestore().collection("users/" + user.uid + "/messageLists").doc().id;
    let chatFound = false;

    return new Promise(async (resolve) => {
      return firebase.firestore().collection("users/" + user.uid + "/messageLists").get().then((messageListsSnap) => {

        if (!messageListsSnap.docs.length) {
          console.log("1");
          return resolve(newId);
        }
        for (let index = 0; index < messageListsSnap.size; index++) {
          const element = messageListsSnap.docs[index];
          let data = element.data();
          let previousRecipientsUids = this.getRecipientsUids(data.recipients).sort().toString();
          let alreadyStratedAChat = recipientsUids.sort().toString() == previousRecipientsUids;
          if (alreadyStratedAChat) {
            chatFound = true;
            console.log(element.id, "old id");
            return resolve(element.id);
          }
        }
        console.log(newId);
        return resolve(newId);
  
      })
    })

  }


  getRecipientsUids(recipientsUids): any[] {
    let recipients = [];
    recipientsUids.forEach((recipient) => {
      recipients.push(recipient.uid)
    })
    return recipients;
  }

}
