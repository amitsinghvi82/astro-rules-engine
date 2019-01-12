var sdkClient = require('../../sdk/sdk');

// make some dummy data in order to call vedic rishi api
var data = {
  'date': 10,
  'month': 12,
  'year': 1993,
  'hour': 1,
  'minute': 25,
  'latitude': 25,
  'longitude': 82,
  'timezone': 5.5
};

// api name which is to be called
var resource = "horo_chart/D1";

module.exports = function(webserver) {

webserver.get('/', function(req,res) {
  // call horoscope apis
  sdkClient.call(resource, data.date, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone, function(error, result){

  if(error)
  {
      console.log("Error returned!!");
  }
  else
  {
      console.log('Response has arrived from API server --');
      console.log(result);
      res.render('index', {
        layout: 'layouts/default',
        base_url: req.hostname,
        api_response: result
      });
  }
  });
    

});


webserver.get('/getGeoDetails', function(req,res) {
  var resource = "geo_details";
  var data = {
    'place': 'Indore',
    'maxRows': 1
  };
  // call horoscope apis
  sdkClient.geoDetailsCall(resource, data.place, data.maxRows, function(error, result){

  if(error)
  {
      console.log("Error returned!!");
  }
  else
  {
      console.log('Response has arrived from API server --');
      console.log(result);
      res.render('index', {
        layout: 'layouts/default',
        base_url: req.hostname,
        api_response: result
      });
  }
  });
    

});


}
