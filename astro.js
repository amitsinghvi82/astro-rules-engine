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
  'date': 17,
  'month': 5,
  'year': 1973,
  'hour': 20,
  'minute': 45,
  'latitude': 22.71792,
  'longitude': 75.8333,
  'timezone': 5.5
};

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();
var hour = dateObj.getHours();
var minute = dateObj.getMinutes();

console.log("Day:" + day + " Month:" + month + " Year:" + year + " Hour:" + hour + " Minute:" + minute);

// api name which is to be called
var resource = "horo_chart/D1";

let HIGH = 100
let LOW = 1
let MEDIUM = 50
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
            console.log('Birth Horoscope Response has arrived from API server --');
            console.log(result);
            var apiResponse = JSON.parse(result);
            var dhanLord = lordRule.getDhanLord(apiResponse[1].sign);
            console.log("Dhan Lord:" + dhanLord);
            resolve(dhanLord);
        }
      })      
    })
  })
  
  //return 'Ve';
}, { priority: HIGH })

engine.addFact('current-api-response', (params, almanac) => {
  console.log('Checking the "current-api-response" fact...') // this message will not appear
  return new Promise((resolve, reject) => {
    setImmediate(() => {      
      sdkClient.call(resource, day, month, year, hour, minute, data.latitude, data.longitude, data.timezone, function(error, result){

        if(error)
        {
            console.log("Error returned!!" + error);
        }
        else
        {
          console.log('Current Horoscope Response has arrived from API server --');
          console.log(result);
          var apiResponse = JSON.parse(result);
          resolve(apiResponse);
        }
    })
  })
})
}, { priority: HIGH })

engine.addFact('dhan-lord-moon-distance', (params, almanac) => {
  // this fact will not be evaluated, because the "date" fact will fail first
  console.log('Checking the "dhan-lord-moon-distance" fact...') // this message will not appear  
      return new Promise((resolve, reject) => {
        setImmediate(() => {
          almanac.factValue('dhan-lord')
          .then(dhanLord => {
            almanac.factValue('current-api-response')
            .then(apiResponse => {
              var dhanLordMoonDistance = lordRule.getDhanLordMoonDistance(apiResponse, dhanLord)
              console.log('Dhan Lord distance from Moon:' + dhanLordMoonDistance);
              resolve(dhanLordMoonDistance);
          })    
        })
      })
    })
  }, { priority: MEDIUM })

  engine.addFact('mars-moon-distance', (params, almanac) => {
    // this fact will not be evaluated, because the "date" fact will fail first
    console.log('Checking the "mars-moon-distance" fact...') // this message will not appear  
    return new Promise((resolve, reject) => {
      setImmediate(() => {
        almanac.factValue('dhan-lord')
        .then(dhanLord => {
          almanac.factValue('current-api-response')
          .then(apiResponse => {
            var marsMoonDistance = lordRule.getMarsMoonDistance(apiResponse)
            console.log('Mars distance from Moon:' + marsMoonDistance);
            resolve(marsMoonDistance);
        })    
      })
    })
  })
  }, { priority: LOW })
    
  engine.addFact('jupiter-moon-distance', (params, almanac) => {
      // this fact will not be evaluated, because the "date" fact will fail first
      console.log('Checking the "jupiter-moon-distance" fact...') // this message will not appear  
      return new Promise((resolve, reject) => {
        setImmediate(() => {
          almanac.factValue('dhan-lord')
          .then(dhanLord => {
            almanac.factValue('current-api-response')
            .then(apiResponse => {
              var jupiterMoonDistance = lordRule.getJupiterMoonDistance(apiResponse);
              console.log('Jupiter distance from Moon:' + jupiterMoonDistance);
              resolve(jupiterMoonDistance);
          })    
        })
      })
    })
  }, { priority: LOW })

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
