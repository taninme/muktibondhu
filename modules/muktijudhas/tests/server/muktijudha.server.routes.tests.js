'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Muktijudha = mongoose.model('Muktijudha'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, muktijudha;

/**
 * Muktijudha routes tests
 */
describe('Muktijudha CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Muktijudha
		user.save(function() {
			muktijudha = {
				name: 'Muktijudha Name'
			};

			done();
		});
	});

	it('should be able to save Muktijudha instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Muktijudha
				agent.post('/api/muktijudhas')
					.send(muktijudha)
					.expect(200)
					.end(function(muktijudhaSaveErr, muktijudhaSaveRes) {
						// Handle Muktijudha save error
						if (muktijudhaSaveErr) done(muktijudhaSaveErr);

						// Get a list of Muktijudhas
						agent.get('/api/muktijudhas')
							.end(function(muktijudhasGetErr, muktijudhasGetRes) {
								// Handle Muktijudha save error
								if (muktijudhasGetErr) done(muktijudhasGetErr);

								// Get Muktijudhas list
								var muktijudhas = muktijudhasGetRes.body;

								// Set assertions
								(muktijudhas[0].user._id).should.equal(userId);
								(muktijudhas[0].name).should.match('Muktijudha Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Muktijudha instance if not logged in', function(done) {
		agent.post('/api/muktijudhas')
			.send(muktijudha)
			.expect(403)
			.end(function(muktijudhaSaveErr, muktijudhaSaveRes) {
				// Call the assertion callback
				done(muktijudhaSaveErr);
			});
	});

	it('should not be able to save Muktijudha instance if no name is provided', function(done) {
		// Invalidate name field
		muktijudha.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Muktijudha
				agent.post('/api/muktijudhas')
					.send(muktijudha)
					.expect(400)
					.end(function(muktijudhaSaveErr, muktijudhaSaveRes) {
						// Set message assertion
						(muktijudhaSaveRes.body.message).should.match('Please fill Muktijudha name');
						
						// Handle Muktijudha save error
						done(muktijudhaSaveErr);
					});
			});
	});

	it('should be able to update Muktijudha instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Muktijudha
				agent.post('/api/muktijudhas')
					.send(muktijudha)
					.expect(200)
					.end(function(muktijudhaSaveErr, muktijudhaSaveRes) {
						// Handle Muktijudha save error
						if (muktijudhaSaveErr) done(muktijudhaSaveErr);

						// Update Muktijudha name
						muktijudha.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Muktijudha
						agent.put('/api/muktijudhas/' + muktijudhaSaveRes.body._id)
							.send(muktijudha)
							.expect(200)
							.end(function(muktijudhaUpdateErr, muktijudhaUpdateRes) {
								// Handle Muktijudha update error
								if (muktijudhaUpdateErr) done(muktijudhaUpdateErr);

								// Set assertions
								(muktijudhaUpdateRes.body._id).should.equal(muktijudhaSaveRes.body._id);
								(muktijudhaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Muktijudhas if not signed in', function(done) {
		// Create new Muktijudha model instance
		var muktijudhaObj = new Muktijudha(muktijudha);

		// Save the Muktijudha
		muktijudhaObj.save(function() {
			// Request Muktijudhas
			request(app).get('/api/muktijudhas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Muktijudha if not signed in', function(done) {
		// Create new Muktijudha model instance
		var muktijudhaObj = new Muktijudha(muktijudha);

		// Save the Muktijudha
		muktijudhaObj.save(function() {
			request(app).get('/api/muktijudhas/' + muktijudhaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', muktijudha.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Muktijudha instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Muktijudha
				agent.post('/api/muktijudhas')
					.send(muktijudha)
					.expect(200)
					.end(function(muktijudhaSaveErr, muktijudhaSaveRes) {
						// Handle Muktijudha save error
						if (muktijudhaSaveErr) done(muktijudhaSaveErr);

						// Delete existing Muktijudha
						agent.delete('/api/muktijudhas/' + muktijudhaSaveRes.body._id)
							.send(muktijudha)
							.expect(200)
							.end(function(muktijudhaDeleteErr, muktijudhaDeleteRes) {
								// Handle Muktijudha error error
								if (muktijudhaDeleteErr) done(muktijudhaDeleteErr);

								// Set assertions
								(muktijudhaDeleteRes.body._id).should.equal(muktijudhaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Muktijudha instance if not signed in', function(done) {
		// Set Muktijudha user 
		muktijudha.user = user;

		// Create new Muktijudha model instance
		var muktijudhaObj = new Muktijudha(muktijudha);

		// Save the Muktijudha
		muktijudhaObj.save(function() {
			// Try deleting Muktijudha
			request(app).delete('/api/muktijudhas/' + muktijudhaObj._id)
			.expect(403)
			.end(function(muktijudhaDeleteErr, muktijudhaDeleteRes) {
				// Set message assertion
				(muktijudhaDeleteRes.body.message).should.match('User is not authorized');

				// Handle Muktijudha error error
				done(muktijudhaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Muktijudha.remove().exec(function(){
				done();
			});
		});
	});
});
