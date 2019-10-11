import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { FirebaseService } from './firebase.service';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
  ) {
    this.getUser();
  }



  firebaseUser;
  user;

  getUser = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        this.firebaseUser = firebaseUser;
        let user = await this.firebaseService.getDocument("/users/" + firebaseUser.uid);
        return resolve(user)
      })

    })

  }
  createUserWitEmail(email, password) {
    return new Promise((resolve) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }

  loginUserWithEmail(email, password) {
    return new Promise((resolve) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }
  updateProfile(photoURL, displayName) {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updateProfile({
        photoURL: photoURL,
        displayName: displayName
      }).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }
  resetPassword(email) {
    return new Promise((resolve) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }
  changeEmail(newEmail) {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updateEmail(newEmail).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }

  sendConfirmationEmail() {
    return new Promise((resolve) => {
      firebase.auth().currentUser.sendEmailVerification().then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }
  createUserData(name, photoURL, uid) {
    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + this.firebaseUser.uid, {
        name: name,
        photoURL: photoURL,
        uid: uid
      }).then(() => {
        return resolve()
      })
    })

  }
  signout() {
    return new Promise((resolve) => {
      firebase.auth().signOut().then(() => {
        this.navCtrl.navigateBack("/auth");
        return resolve()
      })
    })
  }

  getUserFromUid(uid) {
    return new Promise((resolve) => {
      return firebase.firestore().doc("/users/" + uid).get().then((userSnap) => {
        return resolve(userSnap.data())
      })
    })
  }
  displayError(error) {
    this.helper.okAlert("There was a problem", error.message)
  }


}
