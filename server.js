var hapi = require('hapi');
var routes = require('./routes');

var config = {
    docs: true
};

var config = {docs:true};
var port  = parseInt(process.env.PORT, 10); // deploy ready

var server = new hapi.Server('0.0.0.0', port || 9000);

server.route(routes);
server.start();
