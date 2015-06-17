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

