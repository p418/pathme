var Path = require('path');


module PathMe
{
	export declare class Error
	{
		public name:string;
		public message:string;
		constructor(message?:string);
	}


	export class ENOENT extends Error
	{
		public code:string = 'ENOENT';
		public description:string = 'No such file or directory';
		constructor(public message:string)
		{
			super(message);
		}
	}
	

	export class PathMe
	{
		static sep: string = '/';
		private cwd: Object = this.root;
		private path: string[] = [PathMe.sep];
		private pathStack : string[] = [];
		
		constructor(private root: Object){}



		private _cd(attr:string):(PathMe|Boolean)
		{
			if(attr == '' || attr == void 0)
			{
				this.cwd = this.root;
				return this;
			}
			
			if(this.cwd.hasOwnProperty(attr))
			{
				this.cwd = this.cwd[attr];
				return this;
			}
			else
				throw new ENOENT((Path.join(this.pwd(),attr)+' Doesnt exists'));
			return false;
		}


		cd(path:string)
		{
			var newPath = this.resolve(path.toString()).split(PathMe.sep);
			
			if(newPath.length)
			{
				newPath.map(attr => { this._cd(attr);});
				this.path = newPath;
			}
			
			return this;
		}

	
		/**
		*
		*@todo add options like -n, +N or -N
		**/
		pushd(path:string)
		{
			var aPath = this.resolve(path);
			if(this.exists(path))
			{
				this.cd(path);
				this.pathStack.push(this.pwd());
			}
			else
				throw new ENOENT(aPath+' Doesnt exists');
			
			return this;
		}


		/**
		*
		*@todo add options like -n, +N or -N
		**/
		popd()
		{
			var path = this.pathStack.pop();
			
			if(path == void 0)
				throw {message : 'Path stack is empty!'};
			
			
			if(this.exists(path))
			{
				this.cd(path);
			}
			else
				throw new ENOENT(path+' Doesnt exists');
			return this;
		}
		

		resolve(path: string): string
		{
				return  Path.resolve.call(null, this.toString(), path.toString());
		}


		pwd():string
		{
				return Path.resolve.apply(null, ['/'].concat(this.path));
		}

		exists(path:string):boolean
		{
			var aPath = this.resolve(path).split(PathMe.sep);
			if(aPath.length)
			{
				var cwd = this.cwd;
				return aPath.every(attr => {
										
					if(attr == '' || cwd.hasOwnProperty(attr))
					{
						cwd = attr==''?this.root:cwd[attr];
						return true;
					}
					
					return false;
				});
			}
			return true;
		}



		mkdir(path:string)
		{
			var aPath  = this.resolve(path);
			var parent = Path.dirname(aPath);
			
			if(this.exists(parent))
			{
				
			}
			
			return false;
		}



		toString():string
		{
			return this.pwd();
		}
	}
}

module.exports = function(obj)
{
    return new PathMe.PathMe(obj);
}

