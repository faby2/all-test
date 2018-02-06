import { Component , NgModule} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database' ;


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  arrData =[] ;
  username ;
  password ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
    this.fdb.list("/myItems/").subscribe((_data) => {
      this.arrData = _data;
      console.log(this.arrData) ;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  newUser() {
  	//this.navCtrl.setRoot(HomePage) ;
    let data = [this.username,this.password]
    this.fdb.list("/myItems/").push(data).then( ok => {
      if(ok) 
        //this.navCtrl.setRoot(HomePage) ;
       alert('ok') ;
      else
        alert('erreur') ;
    })
  }
  delete (i) {
    this.fdb.list("/myItems/").remove(this.arrData[i].$key);
  }

}
