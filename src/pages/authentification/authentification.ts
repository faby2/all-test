import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth' ; 
import { HomePage } from '../home/home' ; 


@IonicPage()
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html',
})
export class AuthentificationPage {

  @ViewChild('username') user ;
  @ViewChild('password') pswd ;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public fAuth: AngularFireAuth,
   private alertCtrl: AlertController
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');
  }
  
  alert(message: string) {
  	this.alertCtrl.create({
  		title: "info",
  		subTitle: message,
  		buttons: ['OK']
  	}).present();
  }

  logIn() {
  	this.fAuth.auth.signInWithEmailAndPassword(this.user.value, this.pswd.value)
  	.then( data => {
  		console.log('got some data', this.fAuth.auth.currentUser);
  		this.alert('success! You\'re logged in');
  		this.navCtrl.setRoot( HomePage );
  	})
  	.catch( error => {
  		console.log("Would sign in with ", this.user.value,this.pswd.value);
  		this.alert(error.message) ;
  	})
  }

}
