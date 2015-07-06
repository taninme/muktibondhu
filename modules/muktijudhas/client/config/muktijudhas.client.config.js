'use strict';

// Configuring the Muktijudhas module
angular.module('muktijudhas').run(['Menus',
	function(Menus) {
		// Add the Muktijudhas dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Muktijudhas',
			state: 'muktijudhas',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'muktijudhas', {
			title: 'List Muktijudhas',
			state: 'muktijudhas.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'muktijudhas', {
			title: 'Create Muktijudha',
			state: 'muktijudhas.create'
		});
	}
]);