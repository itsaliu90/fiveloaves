/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));

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

var seed = function () {
    seedUsers().then(function (users) {
        console.log(chalk.magenta('Seeded Users!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
};

var wipeDB = function () {
    var models = [User];

    models.forEach(function (model) {
        model.find({}).remove(function () {});
    });

    return Promise.resolve();
};

connectToDb.then(function () {
    wipeDB().then(seed);
});
