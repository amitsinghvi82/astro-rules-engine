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

// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)

let Engine = require('json-rules-engine').Engine;
let Rule = require('json-rules-engine').Rule
let engine = new Engine();

/**
 * Create a rule
 */
let rule = new Rule({
    // define the 'conditions' for when "hello world" should display
    conditions: {
      all: [{
        fact: 'displayMessage',
        operator: 'equal',
        value: true
      }]
    },
    // define the 'event' that will fire when the condition evaluates truthy
    event: {
      type: 'message',
      params: {
        data: 'hello-world!'
      }
    }
  })
  
  // add rule to engine
  
// Run the engine to evaluate
engine
  .addRule(rule);

  
let facts = { displayMessage: true }

engine  
  .run(facts)
  .then(events => { // run() returns events with truthy conditions
    events.map(event => console.log(event.params.data))
  })
 
/*
 * Output:
 *
 * Player has fouled out!
 */

console.log('I AM ONLINE! COME TALK TO ME: http://localhost:' + (process.env.PORT || 3000))
