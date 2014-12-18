var Hapi = require('hapi');
var Path = require('path');
var numPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

var server = new Hapi.Server();

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates'),
    partialsPath: Path.join(__dirname, 'templates/partials')
});


server.connection({
    host: 'localhost',
    port: numPort
});

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
       reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

// Start the server
server.start();
