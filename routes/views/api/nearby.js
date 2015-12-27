var keystone = require('keystone');
var foursquare = require('../../../utils/foursquare');
var Welp = keystone.list('Welp');
var async = require('async');

exports = module.exports = function(req, res) {

  var query = req.query;

  var limit = query.limit ? parseInt(query.limit) : 1;

  foursquare.getNearby(query.lat, query.lng, limit, function(err, venues){
    // TODO: make this more efficient
    async.each(venues, function(venue, done){
      Welp.model.findOne({foursquareId: venue.foursquareId}, 'welpCount').exec(function(err,result){
        if(result){
          venue.welpCount = result.welpCount;
        }else{
          venue.welpCount = 0;
        }
        done();
      });
    }, function(){
      res.send(venues);
    });
  });


};
