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

// maybe something can be done here:
// Welp.schema.set('toJSON', { getters: true, virtuals: false });
// Welp.schema.set('toObject', { getters: true, virtuals: false });

Welp.schema.virtual('location').get(function () {
  return this.geometry.coordinates;
}).set(function (locationInput) {
  this.set('geometry.coordinates', locationInput);
});



Welp.defaultColumns = 'name, foursquareId, welpCount';
Welp.register();
