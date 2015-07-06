'use strict';

// Muktijudhas controller
angular.module('muktijudhas').controller('MuktijudhasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Muktijudhas',
	function($scope, $stateParams, $location, Authentication, Muktijudhas ) {
		$scope.authentication = Authentication;

		// Create new Muktijudha
		$scope.create = function() {
			// Create new Muktijudha object
			var muktijudha = new Muktijudhas ({
				first_name: this.first_name,
				last_name: this.last_name,
				address:this.address,
				home_phone:this.home_phone,
				mobile_phone:this.mobile_phone

			});

			// Redirect after save
			muktijudha.$save(function(response) {
				$location.path('muktijudhas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Muktijudha
		$scope.remove = function( muktijudha ) {
			if ( muktijudha ) { muktijudha.$remove();

				for (var i in $scope.muktijudhas ) {
					if ($scope.muktijudhas [i] === muktijudha ) {
						$scope.muktijudhas.splice(i, 1);
					}
				}
			} else {
				$scope.muktijudha.$remove(function() {
					$location.path('muktijudhas');
				});
			}
		};

		// Update existing Muktijudha
		$scope.update = function() {
			var muktijudha = $scope.muktijudha ;

			muktijudha.$update(function() {
				$location.path('muktijudhas/' + muktijudha._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Muktijudhas
		$scope.find = function() {
			$scope.muktijudhas = Muktijudhas.query();
		};

		// Find existing Muktijudha
		$scope.findOne = function() {
			$scope.muktijudha = Muktijudhas.get({ 
				muktijudhaId: $stateParams.muktijudhaId
			});
		};
	}
]);