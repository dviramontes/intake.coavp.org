//	restify
//              --API--
//	server config

'use strict';

var restify = require('restify'),
    // all users are deleted after server restart
    // save, the module, uses memory persistance by default
    userSave = require('save')('user'),
    saveMongodb = require('save-mongodb'),
    mongoose = require('mongoose');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/intakes');

var server = restify.createServer({
    name: 'API'
});

server.use(restify.fullResponse()).use(restify.bodyParser());

//  GET plural
//  curl -i http://0.0.0.0:9000/user |  json
server.get('/user', function(req, res) {

    userSave.find({}, function(err, users) {
        res.send(users);
    });

});

// GET single
server.get('/user/:id', function(req, res, next) {

    userSave.findOne({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
        }
        if (user) {
            res.send(user);
        } else {
            res.send(404);
        }
    });
});


// POST single
server.post('/user', function(req, res, next) {
    console.log(req.params);
    if (req.params.name === undefined) {
        console.log('name is undefined yo');
        return next(new restify.InvalidArgumentError('Name must be supplied yo'));
    }

    console.log(req.params.name);
    // event handler for 'save' event
    userSave.on('save', function() {
        console.log('new user created!');
    });
    userSave.create({
        name: req.params.name
    }, function(err, user) {
        if (err) {
            return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
        }
        res.send(201, user);
    });
});



server.listen(9000, function() {
    console.log('%s Listening at %s', server.name, server.url);
});
