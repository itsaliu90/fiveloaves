'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    // User fields
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    phone: {
        type: String
    },
    preferredZipCodes: {
        type: [String]
    },
    isOrganization: {
        type: Boolean
    },

    // Organization Fields (Optional)
    organizationVerified: {
        type: Boolean
    },
    organizationName: {
        type: String
    },
    organizationAddress: {
        type: String
    },
    organizationCity: {
        type: String
    },
    organizationPhone: {
        type: String
    },
    organizationZipCode: {
        type: String
    },
    organizationTwitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },

    // Extra
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});


schema.statics.getUsersByPreferredZipCode = function(zipcode) {
    return mongoose.model('User').find({ preferredZipCodes: zipcode}).exec()
}




// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});




mongoose.model('User', schema);
