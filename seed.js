
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Registrant = Promise.promisifyAll(mongoose.model('Registrant'));
var Post = Promise.promisifyAll(mongoose.model('Post'));

var seedUsers = function () {

    var users = [
        {
            email: 'yuningalexliu+alley@gmail.com',
            password: 'password',
            phone: '+15856629096',
            name: 'Alley NYC',
            address: '500 7th Ave',
            city: 'New York',
            zipCode: '10018',
            verified: true
        }
    ];

    return User.createAsync(users);

};


var seedRegistrants = function () {

    var registrants = [
        {
            phone: '+15856629096',
            zipCodes: ['10023']

        },
        {
            phone: '+16503031192',
            zipCodes: ['10023']

        },
        {
            phone: '+16027381559',
            zipCodes: ['10018']

        },
        {
            phone: '+19148445238',
            zipCodes: ['10018']
        }
    ];

    return Registrant.createAsync(registrants);

};

var seed = function () {
    seedUsers().then(function (users) {
        console.log(chalk.magenta('Seeded Users!'));
        return seedRegistrants();
    }).then(function() {
        console.log(chalk.magenta('Seeded Registrant!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
};

var wipeDB = function () {
    var models = [User, Registrant, Post];

    models.forEach(function (model) {
        model.find({}).remove(function () {});
    });

    return Promise.resolve();
};

connectToDb.then(function () {
    wipeDB().then(seed);
});