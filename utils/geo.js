var geoLib = require('geoLib');
var geoDistance = require('geo-distance-js');

module.exports ={
  getDistance: function (lat1, lng1, lat2, lng2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lng2 - lng1) * p))/2;

    return Math.round(12742000 * Math.asin(Math.sqrt(a)));
  },


  feetToMeters: function(feet){
    return feet / 3.28084;
  }
};
