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
  LocalStrategy = require('passport-local').Strategy;

var app = express();

// load Models
var Intake = require('./models/Intake');
var User = require('./models/User');
// UserProfile = require('../models/UserProfile');

var routes = require('./routes')(app);
var api  = require('./routes/api')(app, Intake);


// DB
mongoose.connect('mongodb://127.0.0.1:27017/intakes');
mongoose.connection.on('error', function (err) {
  console.log(
    chalk.red('Error :: failed to connect to database ' + err));
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


// db.on('error', console.error.bind(console, 'connection error:'));
// console.log(chalk.yellow('connection success'));




app.set('port', process.env.PORT || 9000);
// app.use(app.router);
// app.use(express.static('app'));
app.use(passport.initialize());
// app.use(passport.session());
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

var errMessage = function (err, type) {
  console.error('Error :: ' + type);
  console.dir('Message :: ' + err.message);
};


//  GET plural
//  curl -i http://0.0.0.0:9000/user |  json
app.get('/api/intakes', api.getAll);

// GET single
app.get('/api/intake/:caseNumber', api.get);

// POST single
app.post('/api/intake', api.post);

// DELETE single
app.del('/api/intake/:caseNumber', api.del);

// UPDATE single
app.put('/api/intake/:caseNumber', api.put);
app.post('/login', passport.authenticate('local'), routes.login);
app.post('/register', routes.register);
app.get('/', routes.index);

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
