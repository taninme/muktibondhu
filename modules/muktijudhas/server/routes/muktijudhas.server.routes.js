'use strict';

module.exports = function(app) {
	var muktijudhas = require('../controllers/muktijudhas.server.controller');
	var muktijudhasPolicy = require('../policies/muktijudhas.server.policy');

	// Muktijudhas Routes
	app.route('/api/muktijudhas').all()
		.get(muktijudhas.list).all(muktijudhasPolicy.isAllowed)
		.post(muktijudhas.create);

	app.route('/api/muktijudhas/:muktijudhaId').all(muktijudhasPolicy.isAllowed)
		.get(muktijudhas.read)
		.put(muktijudhas.update)
		.delete(muktijudhas.delete);

	// Finish by binding the Muktijudha middleware
	app.param('muktijudhaId', muktijudhas.muktijudhaByID);
};