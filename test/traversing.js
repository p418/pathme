var should 	= require('chai').should(),
	pathme 	= require('../index.js');

describe('Traversing: ', function()
{
	
	var myObj = { 
					foo :{ bar : ['a','b','c'] }, 
					pi : { ka: { chu : 'chuuuuuuuu' }} 
		   		};
	var myPath = pathme(myObj);	 

	it('should assign myObj as root folder', function()
	{ 
		myPath.root.should.equal(myObj);
		myPath.pwd().should.equal('/');
	});


	var aPath = 'foo/../pi/ka/../../pi/ka/../../pi/ka/chu';
	
	it('should resolve ['+aPath+'] as [/pi/ka/chu]' , function()
	{ 
		myPath.resolve(aPath).should.equal('/pi/ka/chu'); 
    });


	it('should move to ['+aPath+']' , function()
	{ 
		myPath.cd(aPath).cwd.should.equal(myObj.pi.ka.chu); 
		myPath.pwd().should.equal('/pi/ka/chu');
    });
	
	it('should move up 2 "folders"', function()
	{
		myPath.cd('../..').cwd.should.equal(myObj.pi); 
		myPath.pwd().should.equal('/pi');
	});
	
	it('should get back to root', function()
	{
		myPath.cd('ka/chu/../../..').cwd.should.equal(myObj);
		myPath.pwd().should.equal('/');
		
		
		myPath.cd('/').cd('pi/ka').cd('../..').cwd.should.equal(myObj);
		myPath.pwd().should.equal('/');
		
	});
	
	
	it('should handle stack', function()
	{
		myPath.cd('/').pushd('pi/ka/chu').cd('/foo/bar').popd().cwd.should.equal(myObj.pi.ka.chu);
	})
	
	
	
	it('should be able to deals with arrays', function()
	{
		myPath.cd('/foo/bar/0').cwd.should.equal('a');
		myPath.cd('/foo').cd('bar').cd(0).cwd.should.equal('a');
		
	});
	
	it('should detect "folder" existence', function()
	{
		myPath.exists('/foo/bar/pi/ka').should.equal(false);
		myPath.exists('/pi/ka/chu').should.equal(true);
		myPath.cd('/pi/ka').exists('chu').should.equal(true);
	});

	
});