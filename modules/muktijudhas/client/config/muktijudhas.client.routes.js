'use strict';

//Setting up route
angular.module('muktijudhas').config(['$stateProvider',
	function($stateProvider) {
		// Muktijudhas state routing
		$stateProvider.
		state('muktijudhas', {
			abstract: true,
			url: '/muktijudhas',
			template: '<ui-view/>'
		}).
		state('muktijudhas.list', {
			url: '',
			templateUrl: 'modules/muktijudhas/views/list-muktijudhas.client.view.html'
		}).
		state('muktijudhas.create', {
			url: '/create',
			templateUrl: 'modules/muktijudhas/views/create-muktijudha.client.view.html'
		}).
		state('muktijudhas.view', {
			url: '/:muktijudhaId',
			templateUrl: 'modules/muktijudhas/views/view-muktijudha.client.view.html'
		}).
		state('muktijudhas.edit', {
			url: '/:muktijudhaId/edit',
			templateUrl: 'modules/muktijudhas/views/edit-muktijudha.client.view.html'
		});
	}
]);