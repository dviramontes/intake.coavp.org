//  restify
//              --API--
//  server config

'use strict';

var restify = require('restify'),
	colors = require('colors'),
	mongoose = require('mongoose'),
	Intake,
	testIntakeInsert;
// all users are deleted after server restart
// save, the module, uses  in-memory persistance by default
// save = require('save'),
// s = require('Intake'),
// use save-mongodb for real persistance
// saveMongodb = require('save-mongodb'),


mongoose.connect('mongodb://127.0.0.1:27017/intakes');
var db = mongoose.connection;
Intake = require('../models/Intake').Intake;

db.on('error', console.error.bind(console, 'connection error:'));
console.log('connection success'.green);

db.on('open', function callback() {
	testIntakeInsert();
	console.log('database opened'.green);
});

var server = restify.createServer({
	name: 'API'
});

server
	.use(restify.fullResponse())
	.use(restify.bodyParser());

//  GET plural
//  curl -i http://0.0.0.0:9000/user |  json
server.get('/intake', function (req, res) {

	// lets find some intakes..
	Intake.find({}, function (err, foundIntakes) {
		if (err) { // error ?
			res.send(err);
		}
		res.json(foundIntakes); // return all intakes in json
	});
});

// GET single
server.get('/intake/:id', function (req, res, next) {
	Intake.findOne({
		_id: req.params.id
	}, function (err, intake) {
		if (err) {
			return next(new restify.InvalidArgumentError(
				JSON.stringify(err.errors)));
		}
		if (intake) {
			res.send(intake);
		} else {
			res.send(404);
		}
	});
});

// POST single
server.post('/intake', function (req, res, next) {
	// console.log(req.params);
	if (req.params.taker === undefined) {
		console.log('name is undefined yo');
		return next(new restify.InvalidArgumentError(
			'Name must be supplied yo'));
	}

	Intake.create({
		taker: req.params.taker
	}, function (err, intake) {
		if (err) {
			return next(
				new restify
					.InvalidArgumentError(
						JSON.stringify(err.errors)
				)
			);
		}
		res.send(201, intake);
	});

	// // console.log(req.params);
	// if (req.params.name === undefined) {
	//     console.log('name is undefined yo');
	//     return next(new restify.InvalidArgumentError(
	//         'Name must be supplied yo'));
	// }
	// console.log(req.params.name);
	// // event handler for 'save' event
	// Intake.on('save', function() {
	//     console.log('new user created!');
	// });


});

server.listen(9000, function () {
	console.log('%s Listening at %s', server.name, server.url);
});

testIntakeInsert = function () {
	var _data = {
		meta : {
			// id : 212123,
			taker: {
				name : {
					first : 'david',
					last: 'viramotnes'
				},
				contributorType : 'Volunteer'
			},
			caseNumber: 212323121,
			hidden:true,
		},
		callbackNeeded : true,
		caseType: 'H',
		caller : {
			name : {
				first : 'david',
				last : 'viramontes'
			},
			email :  'dvimon@msn.com',
			address: '123 wash st'
		},
		callerPresentsAs : 'Familiy',
		referedBy : 'Familiy'
	};

	return new Intake(_data).save(function (err, savedIntake) {
		if (err) {
			throw err;
		}
		console.log('test intake001 was successful'.green);
		console.dir(savedIntake);
	});
};
