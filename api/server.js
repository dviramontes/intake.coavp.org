//
//  * restify.server.config
//

var restify = require('restify'),
    userSave = require('save')('user');

var server = restify.createServer({
    name: 'API'
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser());

server.get('/user', function(req, res, next) {

    userSave.find({}, function(err, users) {
        res.send(users);
    });

});

server.post('/user', function(req, res, next) {

    console.log(req.params.name);

    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError("Name must be supplied"));
    }

    userSave.create({
        name: req.params.name
    }, function(err, user) {
        if (err) {
            return next(new restify.InvalidArgumentError(JSON.stringify(err, errors)));
        }
        res.send(201, user);
    })

})

server.listen(9000, function() {
    console.log('%s Listening at %s', server.name, server.url);
});
