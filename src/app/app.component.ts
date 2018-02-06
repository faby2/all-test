import { Component ,ViewChild} from '@angular/core';
import { Platform , MenuController , Nav , NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Page1Page } from '../pages/page1/page1';
import { LoginPage } from '../pages/login/login';
import { PaymentsPage } from '../pages/payments/payments';
import { RegisterPage } from '../pages/register/register';
import { AuthentificationPage } from '../pages/authentification/authentification';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav ;

  rootPage:any = AuthentificationPage;
  pages:Array<{title:string,component:any}>

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menu :MenuController
    ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
    {title:"home",component:HomePage},
    {title:"page 2",component:Page1Page},
    {title:"Payments",component:PaymentsPage},
    {title:"Register",component:RegisterPage},
    {title:"listes",component:LoginPage},
    {title:"Login",component:AuthentificationPage},
    {title:"log out",component:LoginPage}
    ];
  }
  openPage(p) {
    this.menu.close() ;
    this.nav.setRoot(p.component) ;
  }
}

