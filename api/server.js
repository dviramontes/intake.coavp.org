//	restify
//  * 	--API--
//	server config

var restify = require('restify'),
    userSave = require('save')('user');

var server = restify.createServer({
    name: 'API'
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser());


//  curl -i http://0.0.0.0:9000/user |  json
server.get('/user', function(req, res, next) {

    userSave.find({}, function(err, users) {
        res.send(users);
    });

});

// all users are deleted after server restart

server.post('/user', function(req, res, next) {

    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError("Name must be supplied"));
    }

    console.log(req.params.name);
    // event handler for 'save' event
    userSave.on('save', function() {
        console.log("new user created!")
    });
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
