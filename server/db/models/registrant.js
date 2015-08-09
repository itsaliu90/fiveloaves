'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    phone: {
        type: String
    },
    zipCodes: {
        type: [String]
    }
});


schema.statics.getRegistrantsByZipCode = function(zipcode) {
    return mongoose.model('Registrant').find({ zipCodes: '10023'}).exec()
}




mongoose.model('Registrant', schema);
