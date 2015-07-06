'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Muktijudha = mongoose.model('Muktijudha'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Muktijudha
 */
exports.create = function(req, res) {
	var muktijudha = new Muktijudha(req.body);
	muktijudha.user = req.user;

	muktijudha.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(muktijudha);
		}
	});
};

/**
 * Show the current Muktijudha
 */
exports.read = function(req, res) {
	res.jsonp(req.muktijudha);
};

/**
 * Update a Muktijudha
 */
exports.update = function(req, res) {
	var muktijudha = req.muktijudha ;

	muktijudha = _.extend(muktijudha , req.body);

	muktijudha.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(muktijudha);
		}
	});
};

/**
 * Delete an Muktijudha
 */
exports.delete = function(req, res) {
	var muktijudha = req.muktijudha ;

	muktijudha.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(muktijudha);
		}
	});
};

/**
 * List of Muktijudhas
 */
exports.list = function(req, res) { Muktijudha.find().sort('-created').populate('user', 'displayName').exec(function(err, muktijudhas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(muktijudhas);
		}
	});
};

/**
 * Muktijudha middleware
 */
exports.muktijudhaByID = function(req, res, next, id) { Muktijudha.findById(id).populate('user', 'displayName').exec(function(err, muktijudha) {
		if (err) return next(err);
		if (! muktijudha) return next(new Error('Failed to load Muktijudha ' + id));
		req.muktijudha = muktijudha ;
		next();
	});
};