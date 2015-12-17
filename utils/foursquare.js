var request = require('request');
var url = require('url');

module.exports ={
  getDetails: function(id, callback){
    var requestUrl = url.format({
      protocol: 'https',
      hostname: 'api.foursquare.com',
      pathname: '/v2/venues/' + id,
      query: {
        v: '20151216',
        client_id: process.env.FOURSQUARE_ID,
        client_secret: process.env.FOURSQUARE_SECRET,
      }
    });
    request(requestUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var venue = JSON.parse(body).response.venue;
        var result = {};
        result.name = venue.name;
        result.coordinates = [parseFloat(venue.location.lat), parseFloat(venue.location.lng)];
        callback(null, result);
      }else{
        error = error || `foursquare returned ${response.statusCode}`;
        console.error(error);
        callback(error, null);
      }
    });
  },


  getNearby: function(lat, lng, limit, callback){
    var requestUrl = url.format({
      protocol: 'https',
      hostname: 'api.foursquare.com',
      pathname: '/v2/venues/search',
      query: {
        v: '20151216',
        limit: limit,
        ll: `${lat},${lng}`,
        client_id: process.env.FOURSQUARE_ID,
        client_secret: process.env.FOURSQUARE_SECRET,
      }
    });
    request(requestUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var venues = JSON.parse(body).response.venues;
        var result = venues.map(function(venue){
          return{
            foursquareId: venue.id,
            name: venue.name,
            location: [venue.location.lat, venue.location.lng],
            distance: venue.location.distance
          }
        });
        callback(null, result);
      }else{
        error = error || `foursquare returned ${response.statusCode}`;
        console.error(error);
        callback(error, null);
      }
    });
  }
};
