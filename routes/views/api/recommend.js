var keystone = require('keystone');
var foursquare = require('../../../utils/foursquare');
var Welp = keystone.list('Welp');
var async = require('async');

exports = module.exports = function(req, res) {

  var query = req.query;

  var limit = query.limit || 10;

  Welp.model.find({
    geometry: {
      $geoNear: {
        $geometry: {type: "Point", coordinates: [parseFloat(query.lat), parseFloat(query.lng)]},
        $maxDistance: 1000
      },
    }
  }, 'name foursquareId welpCount location').limit(limit).exec(function(err, result){
    if (err){
      console.error(err);
      res.status(500).send('¯\\_(ツ)_/¯ something went wrong for like no reason');
    }else{
      // TODO: convert geometry to location (figure out why the virtual isn't working)
      // TODO: paginate this query advice: https://emptysqua.re/blog/paging-geo-mongodb/
      // TODO: augment with results from foursquare, figure out how that works
      // TODO: include distance from queried location to each result
      res.json(result);
    }
  });




};
