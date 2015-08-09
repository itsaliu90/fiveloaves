'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Registrant = mongoose.model('Registrant');
var Paypal = require('paypal-rest-sdk');
var User = mongoose.model('User');
var secrets = require('../../../../secrets.js');

// Configure PayPal
Paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': secrets.payPalClientId,
  'client_secret': secrets.payPalClientSecret
});

router.get('/', function(req, res, next) {
	console.log("HITTING PAYPAL ROUTE");

	var create_payment_json = {
	    "intent": "sale",
	    "payer": {
	        "payment_method": "credit_card",
	        "funding_instruments": [{
	            "credit_card": {
	                "type": "visa",
	                "number": "4417119669820331",
	                "expire_month": "11",
	                "expire_year": "2018",
	                "cvv2": "874",
	                "first_name": "Joe",
	                "last_name": "Shopper",
	                "billing_address": {
	                    "line1": "52 N Main ST",
	                    "city": "Johnstown",
	                    "state": "OH",
	                    "postal_code": "43210",
	                    "country_code": "US"
	                }
	            }
	        }]
	    },
	    "transactions": [{
	        "amount": {
	            "total": "7",
	            "currency": "USD",
	            "details": {
	                "subtotal": "5",
	                "tax": "1",
	                "shipping": "1"
	            }
	        },
	        "description": "This is the payment transaction description."
	    }]
	};

	Paypal.payment.create(create_payment_json, function (error, payment) {
	    if (error) {
	        throw error;
	    } else {
	        console.log("Create Payment Response");
	        console.log(payment);
	    }
	});
});

module.exports = router;
