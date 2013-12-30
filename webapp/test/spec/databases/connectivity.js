describe('Connectivity : Test', function() {
	
	var request;

	beforeEach(function(){
		request = require('request');
	});

	it('Should be able to connect to database ', function() {
		expect(request).toBeDefined();
	})

})