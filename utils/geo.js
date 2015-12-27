
module.exports ={
  pointToLocation: function(point){
    var coordinates = point.coordinates;
    return [coordinates[1], coordinates[0]];
  },

  feetToMeters: function(feet){
    return feet / 3.28084;
  }
};
