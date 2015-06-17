var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Path = require('path');
var PathMe;
(function (_PathMe) {
    var ENOENT = (function (_super) {
        __extends(ENOENT, _super);
        function ENOENT(message) {
            _super.call(this, message);
            this.message = message;
            this.code = 'ENOENT';
            this.description = 'No such file or directory';
        }
        return ENOENT;
    })(Error);
    _PathMe.ENOENT = ENOENT;
    var PathMe = (function () {
        function PathMe(root) {
            this.root = root;
            this.cwd = this.root;
            this.path = [PathMe.sep];
            this.pathStack = [];
        }
        PathMe.prototype._cd = function (attr) {
            if (attr == '' || attr == void 0) {
                this.cwd = this.root;
                return this;
            }
            if (this.cwd.hasOwnProperty(attr)) {
                this.cwd = this.cwd[attr];
                return this;
            }
            else
                throw new ENOENT((Path.join(this.pwd(), attr) + ' Doesnt exists'));
            return false;
        };
        PathMe.prototype.cd = function (path) {
            var _this = this;
            var newPath = this.resolve(path.toString()).split(PathMe.sep);
            if (newPath.length) {
                newPath.map(function (attr) {
                    _this._cd(attr);
                });
                this.path = newPath;
            }
            return this;
        };
        /**
        *
        *@todo add options like -n, +N or -N
        **/
        PathMe.prototype.pushd = function (path) {
            var aPath = this.resolve(path);
            if (this.exists(path)) {
                this.cd(path);
                this.pathStack.push(this.pwd());
            }
            else
                throw new ENOENT(aPath + ' Doesnt exists');
            return this;
        };
        /**
        *
        *@todo add options like -n, +N or -N
        **/
        PathMe.prototype.popd = function () {
            var path = this.pathStack.pop();
            if (path == void 0)
                throw { message: 'Path stack is empty!' };
            if (this.exists(path)) {
                this.cd(path);
            }
            else
                throw new ENOENT(path + ' Doesnt exists');
            return this;
        };
        PathMe.prototype.resolve = function (path) {
            return Path.resolve.call(null, this.toString(), path.toString());
        };
        PathMe.prototype.pwd = function () {
            return Path.resolve.apply(null, ['/'].concat(this.path));
        };
        PathMe.prototype.exists = function (path) {
            var _this = this;
            var aPath = this.resolve(path).split(PathMe.sep);
            if (aPath.length) {
                var cwd = this.cwd;
                return aPath.every(function (attr) {
                    if (attr == '' || cwd.hasOwnProperty(attr)) {
                        cwd = attr == '' ? _this.root : cwd[attr];
                        return true;
                    }
                    return false;
                });
            }
            return true;
        };
        PathMe.prototype.mkdir = function (path) {
            var aPath = this.resolve(path);
            var parent = Path.dirname(aPath);
            if (this.exists(parent)) {
            }
            return false;
        };
        PathMe.prototype.toString = function () {
            return this.pwd();
        };
        PathMe.sep = '/';
        return PathMe;
    })();
    _PathMe.PathMe = PathMe;
})(PathMe || (PathMe = {}));
module.exports = function (obj) {
    return new PathMe.PathMe(obj);
};
