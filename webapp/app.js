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


// db connection
mongoose.connect('mongodb://localhost/localMongoDB');

// and connection sucesss or error ?
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// otherwise if successful .. make intake Schema object
var IntakeSchema = mongoose
    .Schema({
        taker: String,
        date: Date
    });

// next compile the Schema object into a Model
var Intake = mongoose.model("Intake", IntakeSchema);

// lets test the Intake document model by creating one
var Intake001 = new Intake({taker: "your new intake!"});
console.log(Intake001.name) // logs "^^^^^^^^^^^^^^^"


// lets define the Intake Model:
db.on('open', function callback() {
    console.log('connection success'.green);
    // make Intake Model available to the rest of the app
    module.exports.Intake = Intake;
    // *
    // all done here
    // mongo will auto-generate an _id property
    // for each todo that we create

});

module.exports = app;
