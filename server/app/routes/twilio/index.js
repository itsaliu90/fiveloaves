var router = require('express').Router();
var mongoose = require('mongoose');
var secrets = require('../../../../secrets.js');
// Mongoose models
var Registrant = mongoose.model('Registrant');

module.exports = router;

//Twilio Send SMS Function
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

router.post('/sms', function(req, res) {

	// Fetch phone number and body

	var phone = req.body.From
	var body = req.body.Body

	//Check if phone number already exists in Registrants

	Registrant.find({phone: phone}).then(function(user) {
		if (user.length === 0) {
			console.log("CREATING USER AND SENDING REPLY!");
			var newRegistrant = new Registrant({phone:phone});
			newRegistrant.save(function (err, newRegistrant) {
			  if (err) return console.error(err);
			  console.log("CREATED NEW REGISTRANT WITH PHONE ", newRegistrant.phone);
			});
			// Text them back to see if they want to register
			sendSMS(phone, "Welcomes to fiveloaves! To get started, which zipcodes would you like to receive food alerts for? Please separate with spaces or commas");
		} else {

			var bodyText = body.toLowerCase();

			if (bodyText === 'qt') {
				Registrant.remove({phone: phone}).exec(function(err, data){
					if (err) return err;
				});
				var message = "We're sorry to see you go."
				sendSMS(phone, message);
				return;
			} else if (bodyText === 'me') {
				Registrant.find({phone: phone}).exec(function(err, registrant){
					if(err) console.log(err);
					var message = "Your current zip codes are: " + registrant[0].zipCodes.join(' ')
					sendSMS(phone, message);
				}) 
				return;
			} else if (body.match(/\d{5}/g)){
				var zipCodesArray = body.match(/\d{5}/g);
				Registrant.findOneAndUpdate({phone: phone}, {zipCodes: zipCodesArray}, function(err, data) {
					if (err) return err;
				})
				var message = "Thank you for updating."
				sendSMS(phone, message)				
			} else {
				var message = "Thanks for reaching out. You can always text us a list of zip codes separated by spaces to update your preferences, “me” to see current zip codes, or just “qt” to quit. Thanks!"
				sendSMS(phone, message)
			}
		}
	})

})


















