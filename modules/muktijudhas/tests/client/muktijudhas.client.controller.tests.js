'use strict';

(function() {
	// Muktijudhas Controller Spec
	describe('Muktijudhas Controller Tests', function() {
		// Initialize global variables
		var MuktijudhasController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Muktijudhas controller.
			MuktijudhasController = $controller('MuktijudhasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Muktijudha object fetched from XHR', inject(function(Muktijudhas) {
			// Create sample Muktijudha using the Muktijudhas service
			var sampleMuktijudha = new Muktijudhas({
				name: 'New Muktijudha'
			});

			// Create a sample Muktijudhas array that includes the new Muktijudha
			var sampleMuktijudhas = [sampleMuktijudha];

			// Set GET response
			$httpBackend.expectGET('api/muktijudhas').respond(sampleMuktijudhas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.muktijudhas).toEqualData(sampleMuktijudhas);
		}));

		it('$scope.findOne() should create an array with one Muktijudha object fetched from XHR using a muktijudhaId URL parameter', inject(function(Muktijudhas) {
			// Define a sample Muktijudha object
			var sampleMuktijudha = new Muktijudhas({
				name: 'New Muktijudha'
			});

			// Set the URL parameter
			$stateParams.muktijudhaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/muktijudhas\/([0-9a-fA-F]{24})$/).respond(sampleMuktijudha);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.muktijudha).toEqualData(sampleMuktijudha);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Muktijudhas) {
			// Create a sample Muktijudha object
			var sampleMuktijudhaPostData = new Muktijudhas({
				name: 'New Muktijudha'
			});

			// Create a sample Muktijudha response
			var sampleMuktijudhaResponse = new Muktijudhas({
				_id: '525cf20451979dea2c000001',
				name: 'New Muktijudha'
			});

			// Fixture mock form input values
			scope.name = 'New Muktijudha';

			// Set POST response
			$httpBackend.expectPOST('api/muktijudhas', sampleMuktijudhaPostData).respond(sampleMuktijudhaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Muktijudha was created
			expect($location.path()).toBe('/muktijudhas/' + sampleMuktijudhaResponse._id);
		}));

		it('$scope.update() should update a valid Muktijudha', inject(function(Muktijudhas) {
			// Define a sample Muktijudha put data
			var sampleMuktijudhaPutData = new Muktijudhas({
				_id: '525cf20451979dea2c000001',
				name: 'New Muktijudha'
			});

			// Mock Muktijudha in scope
			scope.muktijudha = sampleMuktijudhaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/muktijudhas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/muktijudhas/' + sampleMuktijudhaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid muktijudhaId and remove the Muktijudha from the scope', inject(function(Muktijudhas) {
			// Create new Muktijudha object
			var sampleMuktijudha = new Muktijudhas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Muktijudhas array and include the Muktijudha
			scope.muktijudhas = [sampleMuktijudha];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/muktijudhas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMuktijudha);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.muktijudhas.length).toBe(0);
		}));
	});
}());