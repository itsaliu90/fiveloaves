'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    pictureUrl: String,
    time : {
        type : Date,
        default: Date.now
    }
});

mongoose.model('Post', schema);
