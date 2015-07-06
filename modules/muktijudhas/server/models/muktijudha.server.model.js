'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Muktijudha Schema
 */
var MuktijudhaSchema = new Schema({
	first_name: {
		type: String,
		default: '',
		required: 'Please fill Muktijudha First Name',
		trim: true
	},
	last_name: {
		type: String,
		default: '',
		required: 'Please fill Muktijudha last name',
		trim: true
	},
	address: {
		type: String,
		default: '',
		required: 'Please fill Muktijudha address',
		trim: true
	},
	home_phone: {
		type: String,
		default: '',
		required: 'Please fill Muktijudha home phone',
		trim: true
	},
	mobile_phone: {
		type: String,
		default: '',
		required: 'Please fill Muktijudha Mobile Phone',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Muktijudha', MuktijudhaSchema);