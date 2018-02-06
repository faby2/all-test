import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth' ;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string ;

  constructor(private fAuth: AngularFireAuth, public navCtrl: NavController) {
  	this.email = this.fAuth.auth.currentUser.email ;
  }

}
