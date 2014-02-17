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

var restify = require('restify'),
    colors = require('colors'),
    mongoose = require('mongoose'),
    // _ = require('lodash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Intake, UserProfile, User,
    appURL = "http://0.0.0.0:9005/#/";
// testIntakeInsert;


mongoose.connect('mongodb://127.0.0.1:27017/intakes');
var db = mongoose.connection;

// load Models
Intake = require('../models/Intake');
UserProfile = require('../models/UserProfile');
User = require('../models/User');

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// call to disconnect DB
// mongoose.disconnect();

db.on('error', console.error.bind(console, 'connection error:'));
console.log('connection success'.green);

db.on('open', function callback() {
    // testIntakeInsert();
    console.log('database opened'.green);
});

var server = restify.createServer({
    name: 'API'
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
// initialize passport
.use(passport.initialize())
// Access-Control-Allow-Origin
.use(restify.CORS());


passport.use(new LocalStrategy(
    function(username, password, done) {
        UserProfile.findOne({
            local: {
                username: username
            }
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

//  GET plural
//  curl -i http://0.0.0.0:9000/user |  json
server.get('/api/intakes', function(req, res) {
    Intake.find({}, function(err, foundIntakes) {
        if (err) { // error ?
            res.send(err);
        }
        res.json(foundIntakes); // return all intakes in json
    });
});

// GET single
server.get('/api/intake/:caseNumber', function(req, res, next) {
    Intake.findOne({
        caseNumber: req.params.caseNumber
    }, function(err, gotIntake) {
        if (err) {
            return next(new restify.InvalidArgumentError(
                JSON.stringify(err.errors)));
        }
        if (gotIntake) {
            res.send(gotIntake);
        } else {
            res.send(404);
        }
    });
});

// POST single
server.post('/api/intake', function(req, res, next) {
    console.log(req.params);
    if (req.params.caller.first === undefined) {
        console.log('name is undefined yo');
        return next(new restify.InvalidArgumentError(
            'Name must be supplied yo'));
    }

    return (new Intake(req.params)
        .save(function(err, savedIntake) {
            if (err) {
                console.warn('duplicate caseNumber, skipping post');
                console.dir(err);
                return next(res.send(JSON.stringify(err.err)));
            }
            res.send(201, savedIntake);
        }));

});

// DELETE single
server.del('/api/intake/:caseNumber', function(req, res, next) {
    Intake.remove({
        caseNumber: req.params.caseNumber
    }, function(err, deletedIntake) {
        if (err) {
            return next(
                new restify.InvalidArgumentError(JSON.stringify(err.errors))
            );
        }
        res.send(200, 'Deleted intake with caseNumber of :' + deletedIntake);
    });
});

// UPDATE single
server.put('/api/intake/:caseNumber', function(req, res, next) {
    console.log('printing req.params'.red);
    console.dir(req.params);
    var caseNumber = req.params.caseNumber || undefined;
    if (caseNumber === undefined) {
        console.log('A case number must be provided update route');
        return next(new restify.InvalidArgumentError(
            'A case number must be provided update route'));
    }
    // aliases
    var _ = req.params;
    var _caller = _.caller;

    var update = {
        'taker': _.taker,
        'contributorType': _.contributorType,
        // 'caseNumber': _.caseNumber,
        'hidden': _.hidden,
        'callbackNeeded': _.callbackNeeded,
        'caseType': _.caseType,
        'caller': {
            'first': _caller.first,
            'last': _caller.last,
            'email': _caller.email,
            'address': _caller.address,
        },
        'callerPresentsAs': _.callerPresentsAs,
        'callerAssessedAs': _.callerAssessedAs,
        'referedBy': _.referedBy
    };

    Intake.findOneAndUpdate({
            'caseNumber': caseNumber
        }, // conditions
        update, // payload
        { // options
            upsert: true,
            new: true
        },

        function(err) { // callback
            if (err) {
                res.send(err.err);
            }
            console.log('updated intake with caseNumber of : ' + caseNumber);
            res.send(200, 'updated intake with caseNumber of : ' + caseNumber);
        });
});

server.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(302, 'successfully logged in', { Location : appURL + 'intake'});
    // or res.header({Location : /redirect});
    //  res.send(302, "message");
});

server.post('/register', function(req, res, next) {
    User.register(new User({
        username: req.params.username
    }), req.params.password, function(err, registeredUser) {
        if (err) {
            return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
        }
        console.log(registeredUser);
        res.send(302, 'successfully register', { Location : appURL + 'intake'});
    });
});

server.listen(9000, function() {
    console.log('%s Listening at %s', server.name, server.url);
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
