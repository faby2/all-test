import { Component, NgModule, ViewChild, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms' ;
import { StripeService, Elements, Element as StripeElement, ElementOptions } from 'ngx-stripe' ;
import { Http, Response, Headers , RequestOptions } from '@angular/http' ;
@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage implements OnInit {
  
  elements: Elements;
  card: StripeElement;
  @ViewChild('card') cardRef:ElementRef;

  elementsOptions:ElementOptions = {};

  stripeTest: FormGroup;

  http: Http;
  takePaymentResult: string;
  endpoint : string = "https://api.stripe.com/v1";
  error :any;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	private stripeService: StripeService,
  	private fb:FormBuilder,
  	http:Http 
  	) {
  	this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
  }
  ngOnInit() {
  	this.stripeTest = this.fb.group({
  	  name:['', [Validators.required]]
  	});
  	this.stripeService.elements({locale:'auto'}).subscribe(elements => {
  		this.elements= elements ;
  		if(!this.card) {
  			this.card = this.elements.create('card', {
  				style: {
  				  base: {
  				  	iconColor: '#666EE8',
	                color: '#31325F',
	                lineHeight: '40px',
	                fontWeight: 300,
	                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
	                fontSize: '18px',
	                '::placeholder': {
	                  color: '#CFD7E0'
	                }
  				  }
  				},hidePostalCode: true,
           iconStyle: 'solid'
  			});
  			this.card.mount(this.cardRef.nativeElement);
        console.log(this.cardRef.nativeElement);
        console.log(this.cardRef.nativeElement.querySelectorAll("input"));
  		}
  	});
  }

  buy() {
  	const name = this.stripeTest.get('name').value;
  	this.stripeService
  	.createToken(this.card, { name })
  	.subscribe(result => {
  		if(result.token) {
  			console.log(result.token);
  			//console.log(this.takePayment(result.token));
  		}
  		 else if (result.error)
  		 	console.log(result.error.message)
       this.displayError(result.error.message) ;
  	});
  }

  takePayment(token:any) {
    console.log(JSON.stringify(token.id));
  	console.log(token.card.country);
  	let body = {
        "card": "tok_1BtWyLBYJdO0haat4Kx3bTCA",
        "currency": "eur",
        "amount": "9999"
      }

      let body1 = "card="+token.id +"&currency=eur&amount=999"; 
     //let bodyString = JSON.stringify(body);
     let headers = new Headers(
       {
         'Content-Type' : 'application/x-www-form-urlencoded',
       'Authorization'  :  'Bearer sk_test_WX63K9MrFdxUiR5HZthlcC8a'
       }) ;

     let options = new RequestOptions({ headers: headers });

     this.http.post(this.endpoint + "/charges", body1 , options)
     .subscribe(response =>{
     	return response.json();
     },error => {
     	return error.json();
     });
  }

  openCheckout() {
  	var handler =(<any> window).stripeCheckout.configure({

  	})
  }
  displayError(error:any) {
    this.error =  error ;
  }
}
