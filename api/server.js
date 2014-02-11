/*====================================

		TODO:
		[X]  -  delete route
		[X]  -  get / single  by caseNumber
		[X]  -  post / single
		[X]  -  put / update / single route
		[	]  -  validate post / single payload
		[	]  -  use hapi

====================================*/

'use strict';

var restify = require('restify'),
    colors = require('colors'),
    mongoose = require('mongoose'),
    Intake,
    testIntakeInsert;

mongoose.connect('mongodb://127.0.0.1:27017/intakes');
var db = mongoose.connection;
Intake = require('../models/Intake').Intake;
// call to disconnect ,,,
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
    .use(restify.CORS()); // Access-Control-Allow-Origin

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
    // console.log(req.params);
    if (req.params.taker === undefined) {
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

    var caseNumber = req.params.caseNumber || undefined;
    if (caseNumber === undefined) {
        console.log('A case number must be provided for this route');
        return next(new restify.InvalidArgumentError(
            'A case number must be provided for this route'));
    }

    // alias
    var _ = req.params;
    var _caller = _.caller;

    var update = {
        'taker': _.taker,
        'contributorType': _.contributorType,
        'caseNumber': _.caseNumber,
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
        'referedBy': _.referedBy
    };

    Intake.findOneAndUpdate({
            'caseNumber': caseNumber
        }, // conditions
        update, // payload
        {
            new: true
        }, // options

        function (err) { // callback
            if (err) {
                res.send(err.err);
            }
            console.log('updated intake with caseNumber of :' + caseNumber);
            res.send(200, 'updated intake with caseNumber of : ' + caseNumber);
        });
});

server.listen(9000, function () {
    console.log('%s Listening at %s', server.name, server.url);
});

testIntakeInsert = function () {
    var _data = {
        'taker': 'david zzzz',
        'contributorType': 'Volunteer',
        'caseNumber': 11,
        'hidden': true,
        'callbackNeeded': true,
        'caseType': 'H',
        'caller': {
            'first': 'david',
            'last': 'zzzzz',
            'email': 'user@msn.com',
            'address': '123 wash st'
        },
        'callerPresentsAs': 'Familiy',
        'referedBy': 'Familiy'
    };

    return (new Intake(_data)
        .save(function (err, savedIntake) {
            if (err) {
                throw err;
            }
            console.log('test intake001 was successful'.green);
            console.dir(savedIntake);
        }));
};

// http://stackoverflow.com/questions/5535610/mongoose-unique-index-not-working
Intake.on('index', function (err) {
    if (err) {
        console.error(err);
    }
});
