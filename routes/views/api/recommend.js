var keystone = require('keystone');
var foursquare = require('../../../utils/foursquare');
var geo = require('../../../utils/geo');
var Welp = keystone.list('Welp');
var _ = require('underscore');

exports = module.exports = function(req, res) {

  var query = req.query;
  var queryLat = parseFloat(query.lat);
  var queryLng = parseFloat(query.lng);

  var limit = query.limit ? parseInt(query.limit) : 10;
  var maxDistance = geo.feetToMeters(query.maxDistance) || geo.feetToMeters(1000);
  var minDistance = geo.feetToMeters(query.minDistance) || 0;


  Welp.model.aggregate([
  {
    $geoNear: {
      near: {type: 'Point', coordinates: [queryLng, queryLat]},
      spherical: true,
      distanceField: 'distance',
      distanceMultiplier : 3.28084, //meters to feet
      maxDistance: maxDistance,
      minDistance: minDistance,
      num: limit
    }
  }], function(err, result) {
    if (err){
      console.error(err);
      res.status(500).send('¯\\_(ツ)_/¯ something went wrong for like no reason');
    }else{
      // TODO: paginate this query advice: https://emptysqua.re/blog/paging-geo-mongodb/
      // TODO: augment with results from foursquare, figure out how that works

      var response = _.map(result, function(venue){
        venue.location = geo.pointToLocation(venue.geometry);
        venue.distance = Math.round(venue.distance);
        var venueObject = _.pick(venue, 'name', 'foursquareId', 'welpCount', 'location', 'distance');
        return venueObject;
      });
      res.json(response);
    }
  });




};
