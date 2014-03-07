/*
 * GET home page.
 */
var chalk = require('chalk');
var User = require('../models/User');


exports.index = function(req, res) {
    res.sendfile(path.join('app') + '/index.html');
}

exports.register = function(req, res, next) {
    console.log(chalk.blue("attempting to register user:"));
    console.dir(req.body);
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, registeredUser) {
        if (err) errMessage(err);
        console.log(registeredUser);
        res.send(302, 'successfully register', {
            'Location': appURL + 'intake'
        });
    });
    exports
}

exports.login = function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(chalk.yellow('user : ') + chalk.red(req.body.username) + chalk.green(' authenticated successfully'));
    res.send(200);
}
