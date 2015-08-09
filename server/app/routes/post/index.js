'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var secrets = require('../../../../secrets.js');
var Post = mongoose.model('Post');
var Registrant = mongoose.model('Registrant');
var moment = require('moment');
moment().format();

// Helper method to send SMS
var sendSMS = function(recipientPhoneNumber, postDescription) {
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

router.get('/', function(req, res, next) {
	var date12hrsAgo = new Date(new Date().getTime() - (12 * 60 * 60 * 1000));

	Post.find({time: { $gte: date12hrsAgo}}, function(err, data) {
		res.json(data);
	});
});

router.get('/:id', function(req, res, next) {
	res.json(req.requestedPost);
});

router.post('/', function(req, res, next) {
	Post.create(req.body, function(err, newPost) {
		if (err) throw err;
		var zipCode = newPost.zipCode;

		// Take zip code of that post and query Registrants for matches
		Registrant.find({zipCodes: zipCode}).then(function(registrants) {

		// Loop through registrants and call "sendMessage method"
			var message = "Free food just posted! Organization: " + newPost.organizationName + "Description: " + newPost.description + "Address: " + newPost.address + "."

			for (var i = 0; i < registrants.length; i++) {
				sendSMS(registrants[i].phone, message);
			}

			res.json(registrants);
		})

		// Done!!!
	});
});

router.param('id', function(req, res, next, id) {
	Post.findById(id, function(err, post) {
		if(err) return next(err);
		if(!post) return res.status(404).end();
		req.requestedPost = post;
		next();
	});
});


module.exports = router;
