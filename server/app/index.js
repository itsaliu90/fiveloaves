'use strict';
var path = require('path');
var express = require('express');
var app = express();
var secrets = require('../../secrets.js');
module.exports = app;
var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

// Mongoose models
// var Organization = mongoose.model('Organization');
var User = mongoose.model('User');
var Registrant = mongoose.model('Registrant');
var Post = mongoose.model('Post');

// Twilio SMS function
var sendSMSforPost = function(recipientPhoneNumber, postDescription) {
	var accountSid = 'ACd2695be19b1e72ebf889d3e9486724cc';
	var authToken = secrets.twilioAuthToken;
	var client = require('twilio')(accountSid, authToken);
	 
	client.messages.create({
	    body: postDescription,
	    to: recipientPhoneNumber,
	    from: "+16193562837"
	}, function(err, message) {
	    console.log("Message Sent");
	    if (err) {
	    	console.log(err);
		}
	});
}

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


app.get('/zipcode', function (req, res) {
    Registrant.getRegistrantsByZipCode('10018')
        .then(function(users){
            res.json(users)
        })
})



// app.get('/post', function (req, res) {
//     var post = new Post({
//     	organization: "55c6899e9d0074e0698628ee",
//     	description: "Ice cream is here!!!"
//     })

//     // Query Organization related to Post based on ID
//     Organization.find({_id: post.organization})
//     // Query Users based on Organization zip code
//     .then(function(organization){
//     	User.getUsersByPreferredZipCode(organization[0].zipCode)
//     	.then(function(users) {
//     // Iterate through users and send texts, passing in To, Description (Post), Location (Organization)
//     		for (var i = 0; i < users.length; i++) {
//     			console.log("CURRENT USER", users[i]);
//     			sendSMSforPost(users[i].phone, post.description + organization[0].address);
//     		}
//         })
//     })
// })

app.get('/', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
    sendSMSforPost("+16503031192", "Wassup Norm!");
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
