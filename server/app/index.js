'use strict';
var path = require('path');
var express = require('express');
var app = express();
var secrets = require('../../secrets.js');
var mongoose = require('mongoose');
var paypal = require('paypal-rest-sdk');
module.exports = app;

// Configure PayPal
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': secrets.payPalClientId,
  'client_secret': secrets.payPalClientSecret
});

// Mongoose models
var User = mongoose.model('User');
var Registrant = mongoose.model('Registrant');
var Post = mongoose.model('Post');

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});


app.get('/paypal', function (req, res) {

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

	paypal.payment.create(create_payment_json, function (error, payment) {
	    if (error) {
	        throw error;
	    } else {
	        console.log("Create Payment Response");
	        console.log(payment);
	    }
	});

})

app.get('/', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
