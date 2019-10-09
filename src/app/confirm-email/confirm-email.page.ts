import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertInput } from '@ionic/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HelperService } from '../services/helper.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.checkEmailInterval = setInterval(() => {
      this.checkEmailVerified();
    }, 1000)
  }

  ionViewWillLeave(){
    clearInterval(this.checkEmailInterval)
  }
  email = firebase.auth().currentUser.email;
  checkEmailInterval;

  checkEmailVerified() {
    firebase.auth().currentUser.reload();
    if (firebase.auth().currentUser.emailVerified) {
      this.navCtrl.navigateForward("home")
    }
  }
  updateEmail() {
    this.email = firebase.auth().currentUser.email;
  }
  signout() {
    this.userService.signout();
  }

  resendEmail() {
    this.userService.sendConfirmationEmail();
    this.helper.okAlert("Confirmation Email Sent", "A confirmation email has been sent.");

  }

  changeEmail() {

    this.helper.inputAlert("New Email Address", "Enter your new email address", [{ name: "email", value: this.email }]).then((result: any) => {
      this.userService.changeEmail(result.email).then((email: any) => {
        this.email = email;
        this.resendEmail();
      })
      this.navCtrl.navigateRoot('/confirm-email');
    })
  }
}
