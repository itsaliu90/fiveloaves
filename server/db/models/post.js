'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    organizationName: String,
    address: String,
    zipCode: String,
    city: String,
    description: String,
    pictureUrl: String,
    time : {
        type : Date,
        default: Date.now
    }
});

mongoose.model('Post', schema);
