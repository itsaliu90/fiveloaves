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
var Registrant = Promise.promisifyAll(mongoose.model('Registrant'));


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

connectToDb.then(function () {
    Registrant.findAsync({}).then(function (registrants) {
        if (registrants.length === 0) {
            return seedRegistrants();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
