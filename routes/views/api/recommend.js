var keystone = require('keystone');
var foursquare = require('../../../utils/foursquare');
var geo = require('../../../utils/geo');
var Welp = keystone.list('Welp');
var async = require('async');
var _ = require('underscore');

exports = module.exports = function(req, res) {

  var query = req.query;
  var queryLat = parseFloat(query.lat);
  var queryLng = parseFloat(query.lng);

  var limit = query.limit || 10;
  var maxDistance = parseFloat(query.maxDistance) || geo.feetToMeters(1000);
  var minDistance = geo.feetToMeters(query.minDistance) || 0;

  Welp.model.find({
    geometry: {
      $geoNear: {
        $geometry: {type: "Point", coordinates: [queryLng, queryLat]},
        $maxDistance: maxDistance,
        $minDistance: minDistance,
        $spherical: false
      },
    }
  }, 'name foursquareId welpCount geometry').limit(limit).exec(function(err, result){
    if (err){
      console.error(err);
      res.status(500).send('¯\\_(ツ)_/¯ something went wrong for like no reason');
    }else{
      // TODO: paginate this query advice: https://emptysqua.re/blog/paging-geo-mongodb/
      // TODO: augment with results from foursquare, figure out how that works
      var response = _.map(result, function(venue){
        var venueObject = _.pick(venue.toObject(), 'name', 'foursquareId', 'welpCount', 'location');
        var location = venueObject.location;
        venueObject.distance = geo.getDistance(queryLat, queryLng, location[0], location[1]);
        return venueObject;
      });
      res.json(response);

    }
  });


};
