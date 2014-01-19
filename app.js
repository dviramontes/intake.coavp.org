"use strict";

/**

    TODO:
    [x] - setup mongodb config
    [x] - connect to db
    [x] - make schema and compile it
    [x] - export model & schema configs


**/

var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    mongoose = require('mongoose'),
    colors = require('colors');

var app = express();
app.directory = __dirname;


require('./config/environments')(app);
require('./routes')(app);
var Intake = require('./models/Intake').Intake;


// establish db connection
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/IntakeDb');
db.on('error', console.error.bind(console, 'connection error:'));
console.log('connection success'.green);

db.on('open', function callback() {
    console.log("database opened".green);
    new Intake({
        taker: [{
            name : "App.js as Test",
            category : "x"
        }],
        date: new Date(),
        hidden: Boolean
    }).save(function(err) {
        if (err) throw err;
        console.log('test intake001 was successful'.green);
    });

});


module.exports = app;
