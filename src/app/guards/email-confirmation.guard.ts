import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private navCtrl: NavController
  ) { }
  async canActivate() {

    if (await this.isEmailVerified()) {
      return true
    } else {
      this.navCtrl.navigateForward("/confirm-email");
      return false;
    };

  }


  async isEmailVerified() {
    return new Promise(async (resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified) {
          return resolve(true)
        } else {
          return resolve(false)
        }
      })
    })
  }

}
