var Hapi = require('hapi');
var Path = require('path');
var numPort = process.env.PORT;

var server = new Hapi.Server();

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates'),
    partialsPath: Path.join(__dirname, 'templates/partials')
});


server.connection({
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
