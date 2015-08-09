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
var Organization = Promise.promisifyAll(mongoose.model('Organization'));


var seedUsers = function () {

    var users = [
        {
            email: 'yuningalexliu@gmail.com',
            password: 'password',
            phone: '+15856629096',
            preferredZipCodes: ['10023']

        },
        {
            email: 'chou.norm@gmail.com',
            password: 'password',
            phone: '+16503031192',
            preferredZipCodes: ['10023']

        },
                {
            email: 'victoratteh@gmail.com',
            password: 'password',
            phone: '+16027381559',
            preferredZipCodes: ['10018']

        },
        {
            email: 'nogever@gmail.com',
            password: 'password',
            phone: '+19148445238',
            preferredZipCodes: ['10018']

        },
        {
            email: 'nogever@gmail.com',
            password: 'password',
            phone: '+19148445238',
            preferredZipCodes: ['10018']

        },
        {
            email: 'yuningalexliu+alley@gmail.com',
            password: 'password',
            phone: '+15856629096',

            //
            organizationName: 'Alley NYC',
            organizationAddress: '500 7th Ave',
            organizationCity: 'New York',
            organizationZipCode: '10018'
        },
    ];

    return User.createAsync(users);

};

// var seedOrganizations = function () {

//     var organizations = [
//         {
//             name: 'Alley NYC',
//             password: 'password',
//             address: '500 7th Ave',
//             city: 'New York',
//             zipCode: '10018'
//         },
//         {
//             name: 'McDonald\'s',
//             password: 'password',
//             address: '2049 Broadway',
//             city: 'New York',
//             zipCode: '10023'
//         },

//     ];

//     return Organization.createAsync(organizations);
// };

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
        }
    }).then(function() {
        return Organization.findAsync({});
    }).then(function (organizations) {
        if (organizations.length === 0) {
            return seedOrganizations();
        } else {
            console.log(chalk.magenta('Seems to already be organization data, exiting!'));
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
