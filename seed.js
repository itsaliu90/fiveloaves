
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
        },
        {
            email: 'TraderJoe2073@gmail.com',
            password: 'password',
            phone: '+15856629096',
            name: 'Trader Joe\'s',
            address: '2073 Broadway',
            city: 'New York',
            zipCode: '10010',
            verified: true
        },
        {
            email: 'TraderJoe675@gmail.com',
            password: 'password',
            phone: '+15856629096',
            name: 'Trader Joe\'s',
            address: '675 6th Ave',
            city: 'New York',
            zipCode: '10023',
            verified: true
        },
        {
            email: 'PaneraBread330@gmail.com',
            password: 'password',
            phone: '+15856629096',
            name: 'Panera Bread',
            address: '330 5th Ave',
            city: 'New York',
            zipCode: '10001',
            verified: true
        },
        {
            email: 'Starbucks151@gmail.com',
            password: 'password',
            phone: '+15856629096',
            name: 'Starbucks',
            address: '151 W 34th St Fifth Floor',
            city: 'New York',
            zipCode: '10001',
            verified: true
        },
        {
            email: 'McDonalds429@gmail.com',
            password: 'password',
            phone: '+15856629096',
            name: 'McDonald\'s',
            address: '429 7th Ave',
            city: 'New York',
            zipCode: '10001',
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

var seedPosts = function () {

    var posts = [
        {
            organizationID: null,
            organizationName: 'McDonald\'s',
            address: '429 7th Ave',
            zipCode: '10001',
            city: 'New York',
            description: 'Free Big Mac burgers near front door!',
            pictureUrl: null
        },
        {
            organizationID: null,
            organizationName: 'Starbucks',
            address: '151 W 34th St Fifth Floor',
            zipCode: '10001',
            city: 'New York',
            description: '20 free cookies in a bag near in lobby!',
            pictureUrl: null
        },
        {
            organizationID: null,
            organizationName: 'Panera Bread',
            address: '330 5th Ave',
            zipCode: '10001',
            city: 'New York',
            description: 'Fresh bread in a paper bag',
            pictureUrl: null
        },
        {
            organizationID: null,
            organizationName: 'Panera Bread',
            address: '330 5th Ave',
            zipCode: '10001',
            city: 'New York',
            description: 'More free bread just left near the emergency exit',
            pictureUrl: null
        },
        {
            organizationID: null,
            organizationName: 'Trader Joe\'s',
            address: '675 6th Ave',
            zipCode: '10001',
            city: 'New York',
            description: '20 free frozen food being handed out near our entrance!',
            pictureUrl: null
        },
        {
            organizationID: null,
            organizationName: 'Trader Joe\'s',
            address: '2073 Broadway',
            zipCode: '10010',
            city: 'New York',
            description: 'Fresh fruit being given away at 2073 Broadway!',
            pictureUrl: null
        },
    ];

    return Post.createAsync(posts);

};

var seed = function () {
    seedUsers().then(function (users) {
        console.log(chalk.magenta('Seeded Users!'));
        return seedRegistrants();
    }).then(function() {
        console.log(chalk.magenta('Seeded Registrant!'));
        return seedPosts();
    }).then(function() {
        console.log(chalk.magenta('Seeded Posts!'));
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