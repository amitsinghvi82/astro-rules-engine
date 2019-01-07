var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('astro:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');


module.exports = function() {

    console.log('Setting up web server');
    var webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    // set up handlebars ready for tabs
    webserver.engine('hbs', hbs.express4({partialsDir: __dirname + '/../views/partials'}));
    webserver.set('view engine', 'hbs');
    webserver.set('views', __dirname + '/../views/');    

    webserver.use(express.static('public'));

    webserver.listen(process.env.PORT || 3000, null, function() {

        debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);

    });    
    
    // import all the pre-defined routes that are present in /components/routes
    var normalizedPathToRoutes = require('path').join(__dirname, 'routes');
    if (fs.existsSync(normalizedPathToRoutes)) {
        fs.readdirSync(normalizedPathToRoutes).forEach(function (file) {
            require('./routes/' + file)(webserver);
        });
    }

    return webserver;

};
