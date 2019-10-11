import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { HelperService } from '../services/helper.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  ngOnInit() {
  }


  showForgotPasswordEmailError;
  showRegisterEmailError;
  showRegisterPasswordError;
  showRegisterFnameError;
  showRegisterLnameError;
  showLoginEmailError;
  showLoginPasswordError;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController,
    private helper: HelperService,
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })


  }


  firebaseUser = firebase.auth().currentUser;


  
  checkforgotPasswordEmail() {
    if (this.forgotPasswordForm.invalid) {
      this.showForgotPasswordEmailError = true;
    } else {
      this.showForgotPasswordEmailError = false;
    }
  }

  checkLoginEmail() {
    if (this.loginForm.controls["email"].invalid) {
      this.showLoginEmailError = true
    } else {
      this.showLoginEmailError = false;
    }
  }

  checkLoginPassword() {
    if (this.loginForm.controls["password"].invalid) {
      this.showLoginPasswordError = true
    } else {
      this.showLoginPasswordError = false;
    }
  }

  checkRegisterEmail() {
    if (this.registerForm.controls["email"].invalid) {
      this.showRegisterEmailError = true
    } else {
      this.showRegisterEmailError = false;
    }
  }

  checkRegisterPassword() {
    if (this.registerForm.controls["password"].invalid) {
      this.showRegisterPasswordError = true
    } else {
      this.showRegisterPasswordError = false;
    }
  }

  checkRegisterFname() {
    if (this.registerForm.controls["fname"].invalid) {
      this.showRegisterFnameError = true
    } else {
      this.showRegisterFnameError = false;
    }
  }

  checkRegisterLname() {
    if (this.registerForm.controls["lname"].invalid) {
      this.showRegisterLnameError = true
    } else {
      this.showRegisterLnameError = false;
    }
  }


  registerWithEmail() {
    let form = this.registerForm.value;
    this.userService.createUserWitEmail(form.email, form.password).then(() => {
      this.userService.updateProfile("../../assets/images/default-user.png", form.fname + " " + form.lname)
    }).then(()=>{
      this.userService.createUserData(form.fname + " " + form.lname, "../../assets/images/default-user.png", this.userService.firebaseUser.uid).then(()=>{
        this.navCtrl.navigateForward("/confirm-email")
      })
    })
  }
  login() {
    let form = this.loginForm.value;
    this.userService.loginUserWithEmail(form.email, form.password).then(()=>{
      this.navCtrl.navigateForward("/home");
    })
  }

  resetPassword() {
    this.userService.resetPassword(this.forgotPasswordForm.controls["email"].value).then(()=>{
      this.helper.okAlert("Password Reset", "A password reset email has been sent to your email")
    })
  }



  getUserData() {
    return new Promise((resolve) => {
      firebase.firestore().doc("/users/" + firebase.auth().currentUser.uid).get().then((userSnap) => {
        let user = userSnap.data();
        return resolve(user);
      })
    })
  }
}
