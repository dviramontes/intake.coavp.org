/*====================================

    TODO:
    [X]  -  delete route
    [X]  -  get / single  by caseNumber
    [X]  -  post / single
    [X]  -  put / update / single route
    [ ]  -  validate post / single payload
    [ ]  -  use hapi

====================================*/

'use strict';

var express = require('express'),
    path = require('path'),
    flash = require('connect-flash'),
    chalk = require('chalk'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    auth;

var app = express();

// load Models
// var Intake = require('./models/Intake');
var User = require('./models/User');
// UserProfile = require('../models/UserProfile');

// load routes
var routes = require('./routes'); // index.js
var api = require('./routes/api');


// DB
mongoose.connect('mongodb://127.0.0.1:27017/CAVP');

mongoose.connection.on('error', function (err) {
    console.log(chalk.red('Error :: failed to connect to database ' + err));
});

mongoose.connection.on('open', function callback() {
    // testIntakeInsert();
    console.log(chalk.blue('database opened'));
});

// call to manual disconnect DB if needed
// mongoose.disconnect();
// or db.disconnect();

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// define middleware function to be used for every secured route
auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        console.log('unauthorized')
        res.send(401); // unauthorized
    } else {
        next();
    }
}


// db.on('error', console.error.bind(console, 'connection error:'));
// console.log(chalk.yellow('connection success'));

app.set('port', process.env.PORT || 9000);
// app.use(app.router);
// app.use(express.static('app'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(flash());
app.use(express.static(path.join('app')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// INTAKES DOCUMENT API
// *

//  GET plural - curl -i http://0.0.0.0:9000/user |  json
app.get('/api/intakes', api.getAll);
// GET single
app.get('/api/intake/:caseNumber', api.get);
// POST single
app.post('/api/intake', api.post);
// DELETE single
app.del('/api/intake/:caseNumber', api.del);
// UPDATE single
app.put('/api/intake/:caseNumber', api.put);

// FRONT-END User API
// *

app.get('/', auth, routes.index);
app.get('/loggedIn', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : 0);
});
app.post('/login', passport.authenticate('local'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(chalk.yellow('user : ') + chalk.red(req.body.username) + chalk.green(' authenticated successfully'));
    res.send(req.user);
});
app.post('/register', routes.register);
app.post('logout', function(req,res){
    req.logOut();
    req.send(200);
})

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// http://stackoverflow.com/questions/5535610/mongoose-unique-index-not-working
// Intake.on('index', function (err) {
//  if (err) {
//      console.error(err);
//  }
// });

// var testIntakeInsert = function (n) {
//  var x = n || 1;

//  var _data = {
//      'taker': 'david zzzz',
//      'contributorType': 'Volunteer',
//      'caseNumber': x,
//      'hidden': true,
//      'callbackNeeded': true,
//      'caseType': 'H',
//      'caller': {
//          'first': 'david',
//          'last': 'zzzzz',
//          'email': 'user@msn.com',
//          'address': '123 wash st'
//      },
//      'callerPresentsAs': 'Familiy',
//      'callerAssessedAs': 'Friend',
//      'referedBy': 'Familiy',
//      'summaryNotes': 'lorem lorem'
//  };

//  return (new Intake(_data)
//      .save(function (err, savedIntake) {
//          if (err) {
//              throw err;
//          }
//          console.log('test intake001 was successful'.green);
//          console.dir(savedIntake);
//      }));
// };

// var makeOneXNumOfIntakes = (function (num) {
//  _.times(num, function (n) {
//      try {
//          console.log("creating intake..");
//          testIntakeInsert(n);
//      } catch (e) {
//          throw new Error(e);
//      }
//  });
// });
// })(100);

// var makeTestUser = function() {
//     return new UserProfile({
//         'local': {
//             'email': 'me@me.com',
//             'password': 'password'
//         }
//     }).save(function(err, savedUser) {
//         if (err) {
//             throw err;
//         }
//         console.log('user was created'.green);
//         console.dir(savedUser);
//     });
// };
// })();
