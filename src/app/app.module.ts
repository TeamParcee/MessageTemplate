import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';

var firebaseConfig = {
  apiKey: "AIzaSyD95znX56T3CPJydhHmVSiJqq5DMtCMapI",
  authDomain: "parceemessagetemplate.firebaseapp.com",
  databaseURL: "https://parceemessagetemplate.firebaseio.com",
  projectId: "parceemessagetemplate",
  storageBucket: "",
  messagingSenderId: "90705471082",
  appId: "1:90705471082:web:03725605f59ab058e90c13"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    FormBuilder,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
