var secrets = require("../../../secrets.js");

var accountSid = 'ACd2695be19b1e72ebf889d3e9486724cc';
var authToken = secrets.twilioAuthToken;
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "Wassup Norm!",
    to: "+16503031192",
    from: "+15856629096"
}, function(err, message) {
    process.stdout.write(message.sid);
});
