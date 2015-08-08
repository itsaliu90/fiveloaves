'use strict';
var path = require('path');
var express = require('express');
var app = express();
var secrets = require('../../secrets.js');
module.exports = app;
var secrets = require('../../secrets.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

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

    User.find({ preferredZipCodes: '10018'}).exec(function(err, users) {
        if (err) return err;
        console.log(users)
        res.json(users);
    });


})

app.get('/', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));

    var accountSid = 'ACd2695be19b1e72ebf889d3e9486724cc';
    var authToken = secrets.twilioAuthToken;
    var client = require('twilio')(accountSid, authToken);
     
    client.messages.create({
        body: "Wassup Norm!",
        to: "+16503031192",
        from: "+16193562837"
    }, function(err, message) {
        console.log("Message Sent");
        if (err) {
        	console.log(err);
    	}
    });

});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
