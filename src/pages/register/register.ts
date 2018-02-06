import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database' ;
import { AngularFireAuthProvider ,AngularFireAuth } from 'angularfire2/auth' ;


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild("username") user ;
  @ViewChild("password") password;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private afAuth: AngularFireAuth,
  private alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
  }

  registerUser () {
  	this.afAuth.auth.createUserWithEmailAndPassword(this.user.value, this.password.value).then(data =>
  	{
  		console.log("got data", data) ;
      this.alert("register success")
  	}).catch(error =>{
  		console.log('got an erro', error) ;
      this.alert(error.message) ;
  	});
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: "info",
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

}
