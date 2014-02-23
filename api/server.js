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
  chalk = require('chalk'),
  mongoose = require('mongoose'),
  // _ = require('lodash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Intake, UserProfile, User,
  appURL = 'http://0.0.0.0:9005/#/';
// testIntakeInsert;


mongoose.connect('mongodb://127.0.0.1:27017/intakes');
mongoose.connection.on('error', function (err) {
  console.log(chalk.red('Error :: failed to connect to database ') + err);
});

var db = mongoose.connection;

// load Models
Intake = require('../models/Intake');
UserProfile = require('../models/UserProfile');
User = require('../models/User');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// call to disconnect DB
// mongoose.disconnect();

// db.on('error', console.error.bind(console, 'connection error:'));
console.log(chalk.yellow('connection success'));

db.on('open', function callback() {
  // testIntakeInsert();
  console.log(chalk.blue('database opened'));
});

var server = restify.createServer({
  name: 'API'
});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())
  .use(passport.initialize()) // initialize passport
.use(restify.CORS());


// Access-Control-Allow-Origin
// {
// 'origins': ['http://0.0.0.0:9005', 'http://0.0.0.0:9005/#/login', 'http://0.0.0.0:9005/#/intake']
// })
// );


//  GET plural
//  curl -i http://0.0.0.0:9000/user |  json
server.get('/api/intakes', function (req, res) {
  Intake.find({}, function (err, foundIntakes) {
    if (err) { // error ?
      res.send(err);
    }
    res.json(foundIntakes); // return all intakes in json
  });
});

// GET single
server.get('/api/intake/:caseNumber', function (req, res, next) {
  Intake.findOne({
    caseNumber: req.params.caseNumber
  }, function (err, gotIntake) {
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
server.post('/api/intake', function (req, res, next) {
  console.log(req.params);
  if (req.params.caller.first === undefined) {
    console.log('name is undefined yo');
    return next(new restify.InvalidArgumentError(
      'Name must be supplied yo'));
  }

  return (new Intake(req.params)
    .save(function (err, savedIntake) {
      if (err) {
        console.warn('duplicate caseNumber, skipping post');
        console.dir(err);
        return next(res.send(JSON.stringify(err.err)));
      }
      res.send(201, savedIntake);
    }));

});

// DELETE single
server.del('/api/intake/:caseNumber', function (req, res, next) {
  Intake.remove({
    caseNumber: req.params.caseNumber
  }, function (err, deletedIntake) {
    if (err) {
      return next(
        new restify.InvalidArgumentError(JSON.stringify(err.errors))
      );
    }
    res.send(200, 'Deleted intake with caseNumber of :' + deletedIntake);
  });
});

// UPDATE single
server.put('/api/intake/:caseNumber', function (req, res, next) {
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

    function (err) { // callback
      if (err) {
        res.send(err.err);
      }
      console.log('updated intake with caseNumber of : ' + caseNumber);
      res.send(200, 'updated intake with caseNumber of : ' + caseNumber);
    });
});

server.post('/login', passport.authenticate('local', {
  // successRedirect: '/',
  // failureRedirect: '/login'
}), function (req, res, next) {
  // res.send(302, 'successfully logged in', {
  // 	'Location': 'http://0.0.0.0:9000/#/intake'
  // });
  // // or
  // console.log('user authenticated successfully');
  // res.header({
  //   'Location': appURL + '/intake'
  // });
  res.send(302, "ok cool.. ");
  // return next();
  // return next(false);
});

server.post('/register', function (req, res, next) {
  console.log(chalk.blue("attempting to register user:"));
  console.dir(req.params);
  User.register(new User({
    username: req.params.username
  }), req.params.password, function (err, registeredUser) {
    if (err) errMessage(err);
    console.log(registeredUser);
    res.send(302, 'successfully register', {
      'Location': appURL + 'intake'
    });
  });
});

var errMessage = function (err, type) {
  console.error('Error :: ' + type);
  console.dir('Message :: ' + err.message);
};

// static server
// angular app entry
// server.get(/\/#\/?.*/, restify.serveStatic({
//     'directory': '../app',
//     'default' : 'index.html'
// }));
server.get(/^\/.*$/, require('restify').serveStatic({
  'directory': './app',
  'default': 'index.html'
}));


server.listen(9000, function () {
  console.log(chalk.cyan(server.name , 'Listening',   server.url));
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
