var env = require('node-env-file');
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('astro:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');
env(__dirname + '/.env');

var debug = require('debug')('astro:main');

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')();

console.log('I AM ONLINE! COME TALK TO ME: http://localhost:' + (process.env.PORT || 3000))
