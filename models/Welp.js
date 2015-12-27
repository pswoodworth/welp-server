var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Welp Model
 * ==========
 */

var Welp = new keystone.List('Welp', {
	label: '¯\\_(ツ)_/¯'
});

Welp.add({
	name: { type: String, index: true },
	foursquareId: {
		type: String,
		index: true,
		required: true,
		initial: true
	},
	welpCount: { type: Number, index: true}
});

Welp.schema.add({
	geometry: {
		type: { type: String, default:'Point' },
		coordinates: [Number],
	}
});

Welp.schema.index({ geometry: '2dsphere' });

Welp.schema.set('toObject', { virtuals: true });


Welp.schema.virtual('location').get(function () {
	var coordinates = this.geometry.coordinates;
	return [coordinates[1], coordinates[0]];
}).set(function (locationInput) {
	var coordinates = [locationInput[1], locationInput[0]];
  this.set('geometry.coordinates', coordinates);
});



Welp.defaultColumns = 'name, foursquareId, welpCount';
Welp.register();
