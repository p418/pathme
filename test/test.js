var should 	= require('chai').should(),
	fs 		= require('fs'),
	pathme 	= require('../index.js');

describe('Virtual Path: ', function()
{
	
	var myObj = { 
					foo :{ bar : ['a','b','c'] }, 
					pi : { ka: { chu : 'chuuuuuuuu' }} 
		   		};
	var myVP = pathme(myObj);	 

	it('should assign myObj as root folder', function()
	{ 
		myVP.root.should.equal(myObj);
		myVP.pwd().should.equal('/');
	});


	var aPath = 'foo/../pi/ka/../../pi/ka/../../pi/ka/chu';
	
	it('should resolve ['+aPath+'] as [/pi/ka/chu]' , function()
	{ 
		myVP.resolve(aPath).should.equal('/pi/ka/chu'); 
    });


	it('should move to ['+aPath+']' , function()
	{ 
		myVP.cd(aPath).cwd.should.equal(myObj.pi.ka.chu); 
		myVP.pwd().should.equal('/pi/ka/chu');
    });
	
	it('should move up 2 "folders"', function()
	{
		myVP.cd('../..').cwd.should.equal(myObj.pi); 
		myVP.pwd().should.equal('/pi');
	});
	
	it('should get back to root', function()
	{
		myVP.cd('ka/chu/../../..').cwd.should.equal(myObj);
		myVP.pwd().should.equal('/');
		
		
		myVP.cd('/').cd('pi/ka').cd('../..').cwd.should.equal(myObj);
		myVP.pwd().should.equal('/');
		
	});
	
	it('should be able to deals with arrays', function()
	{
		myVP.cd('/foo/bar/0').cwd.should.equal('a');
		myVP.cd('/foo').cd('bar').cd(0).cwd.should.equal('a');
		
	});
	
	it('should detect "folder" existance', function()
	{
		myVP.exists('/foo/bar/pi/ka').should.equal(false);
		myVP.exists('/pi/ka/chu').should.equal(true);
		myVP.cd('/pi/ka').exists('chu').should.equal(true);
	});

	
});