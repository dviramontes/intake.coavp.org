/*
 * GET home page.
 */
var chalk = require('chalk'),
      User = require('../models/User'),
      path = require('path'),
      appURL = 'http://0.0.0.0:9000/';

exports.index = function(req, res) {
    res.sendfile(path.join('app') + '/index.html');
}

exports.register = function(req, res, next) {
    console.log(chalk.blue("attempting to register user:"));
    console.dir(req.body);

    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, registeredUser) {
        if (err) {
          console.error(err);
          // err.name; err.message;
          return next(res.send(err));
        }
        console.log(registeredUser);
        res.send(302, 'successfully register', {
            'Location': appURL + 'intake'
        });
    });
}
