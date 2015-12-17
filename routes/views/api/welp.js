var keystone = require('keystone');
var Welp = keystone.list('Welp');
var async = require('async');
var foursquare = require('../../../utils/foursquare');

exports = module.exports = function(req, res) {

	var id = req.params.foursquareId;

  var saveAndRespond = (model) => {

  };

  var model;
  var errorMessage;

  async.series([
    function(next){
      Welp.model.findOne({foursquareId: id}).exec((err, result)=>{
        if(err){
          errorMessage = "¯\\_(ツ)_/¯ went wrong with the database";
          next(err);
        }else{
          if (result){
            model = result;
            next();
          }else{
            foursquare.getDetails(id, function(err, details){
              if(err){
                errorMessage = "¯\\_(ツ)_/¯ went wrong talking to foursquare";
                next(err);
              }else{
                model = new Welp.model({
                  foursquareId: id,
                  count: 0,
                  name: details.name,
                  geometry: {
                    coordinates: details.coordinates
                  }
                });
                next();
              }
            });
          }
        }
      });
    }],
    function(error){
      if(error){
        res.status(500).send(errorMessage);
      }else{
        model.save((err)=>{
          if(!err){
            res.status(200).send("¯\\_(ツ)_/¯ somehow it worked");
          }else{
            res.status(500).send("¯\\_(ツ)_/¯ something went wrong with the database");
          }
        });
      }
    }
  );




};
