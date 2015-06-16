var should = require('chai').should(),
	fs = require('fs'),
	vp = require('../lib/utils/virtualPath');


describe('Virtual Path: ', function()
{
	
	describe('Initialisation', function()
	{
		var myObj = { foo :{ bar : 1 }, pi : { ka: { chu : {} }} };
		var myVP = vp(myObj);	 
			 
		try
		{
			console.log(myVP.pwd())
			myVP.cd('foo/../pi/ka/../../../../foo/mooo');
			console.log(myVP.pwd())
			
		}catch(e)
		{
			console.log(e);
		}
		/**
		it('should give 33 chunks', function()
		{
			chunks.should.have.length(33);
		});
		**/

	
	});

});