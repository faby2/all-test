import { Component, NgModule, ViewChild, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms' ;
import { StripeService, Elements, Element as StripeElement, ElementOptions } from 'ngx-stripe' ;


@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage implements OnInit {
  
  elements: Elements ;
  card: StripeElement;
  @ViewChild('card') cardRef:ElementRef;

  elementsOptions:ElementOptions = {};

  stripeTest: FormGroup ;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	private stripeService: StripeService,
  	private fb:FormBuilder
  	) {
  }

  ngOnInit() {
  	this.stripeTest = this.fb.group({
  	  name:['', [Validators.required]]
  	});
  	this.stripeService.elements({locale:'es'}).subscribe(elements => {
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
  				}
  			});
  			this.card.mount(this.cardRef.nativeElement);
  		}
  	});
  }

  buy() {
  	const name = this.stripeTest.get('name').value;
  	this.stripeService
  	.createToken(this.card, { name })
  	.subscribe(result => {
  		if(result.token) 
  			console.log(result.token)
  		 else if (result.error)
  		 	console.log(result.error.message)
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
  }
  openCheckout() {
  	var handler =(<any> window).stripeCheckout.configure({

  	})
  }
}
