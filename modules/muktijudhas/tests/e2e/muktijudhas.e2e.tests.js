'use strict';

describe('Muktijudhas E2E Tests:', function() {
	describe('Test Muktijudhas page', function() {
		it('Should not include new Muktijudhas', function() {
			browser.get('http://localhost:3000/#!/muktijudhas');
			expect(element.all(by.repeater('muktijudha in muktijudhas')).count()).toEqual(0);
		});
	});
});
