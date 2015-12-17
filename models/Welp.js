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
	geometry: { type: { type: String, default:'Point' }, coordinates: [Number] }
});



Welp.defaultColumns = 'name, foursquareId, count';
Welp.register();
