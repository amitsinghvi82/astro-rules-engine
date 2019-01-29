var env = require('node-env-file');
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('astro:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');
var sdkClient = require('./sdk/sdk');
var lordRule = require('./utils/lord');

env(__dirname + '/.env');

var debug = require('debug')('astro:main');

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')();

let Engine = require('json-rules-engine').Engine;
let Rule = require('json-rules-engine').Rule
let engine = new Engine();
  
// add rules to engine
var normalizedPath = require("path").join(__dirname, "rules");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  console.log('File:' + file);
  require("./rules/" + file)(engine);
});

// make some dummy data in order to call vedic rishi api
var data = {
  'date': 10,
  'month': 12,
  'year': 1993,
  'hour': 1,
  'minute': 25,
  'latitude': 22.71792,
  'longitude': 75.8333,
  'timezone': 5.5
};

// api name which is to be called
var resource = "horo_chart/D1";

let HIGH = 100
let LOW = 1
let facts;
engine.addFact('dhan-lord', (params, almanac) => {
  // this fact will not be evaluated, because the "date" fact will fail first
  console.log('Checking the "dhan-lord" fact...') // this message will not appear
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      sdkClient.call(resource, data.date, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone, function(error, result){

        if(error)
        {
            console.log("Error returned!!");
        }
        else
        {
            console.log('Response has arrived from API server --');
            console.log(result);
            var apiResponse = JSON.parse(result);
            //var dhanRashi = JSON.parse(apiResponse[1]);
            console.log(apiResponse[1]);
            console.log(apiResponse[1].sign);
            console.log(lordRule.getDhanLord(apiResponse[1].sign));
            resolve(lordRule.getDhanLord(apiResponse[1].sign));
        }
      })      
    })
  })
  
  //return 'Ve';
}, { priority: HIGH })


engine.addFact('dhan-lord-moon-distance','12');
engine.addFact('mars-moon-distance','4');
engine.addFact('jupiter-moon-distance','3');
//engine.addFact('dhan-lord','Ve');
engine  
  .run()
  .then(events => { // run() returns events with truthy conditions
    events.map(event => console.log(event.params.message))
  })
 
/*
 * Output:
 *
 * Player has fouled out!
 */

console.log('I AM ONLINE! COME TALK TO ME: http://localhost:' + (process.env.PORT || 3000))
