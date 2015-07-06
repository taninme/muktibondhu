'use strict';

//Muktijudhas service used to communicate Muktijudhas REST endpoints
angular.module('muktijudhas').factory('Muktijudhas', ['$resource',
	function($resource) {
		return $resource('api/muktijudhas/:muktijudhaId', { muktijudhaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);