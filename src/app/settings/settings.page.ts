import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private userService: UserService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }


  signout(){
    this.helper.confirmationAlert("Sign Out?", "Are you sure you want to sign out?", {denyText: "Cancel", confirmText: "Sign Out"} )
    .then((result)=>{
      if(result){
        this.userService.signout();
      }
    })
  }
}
