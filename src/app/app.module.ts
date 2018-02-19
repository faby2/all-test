import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Page1Page } from '../pages/page1/page1';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PaymentsPage } from '../pages/payments/payments';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth' ;
import { AuthentificationPage } from '../pages/authentification/authentification';

import { HttpModule } from '@angular/http';



import { NgxStripeModule } from 'ngx-stripe';

var config = {
    apiKey: "AIzaSyDDjPuhCttI0EgQ22RyKysfPEYD5YqtoLc",
    authDomain: "myfistproject-86601.firebaseapp.com",
    databaseURL: "https://myfistproject-86601.firebaseio.com",
    projectId: "myfistproject-86601",
    storageBucket: "",
    messagingSenderId: "596954626290"
  };
  
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page1Page,
    LoginPage,
    PaymentsPage,
    RegisterPage,
    AuthentificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    NgxStripeModule.forRoot('pk_test_ymJmF756QPBJwiTuR0iPel7k'),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page1Page,
    LoginPage,
    PaymentsPage,
    RegisterPage,
    AuthentificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
