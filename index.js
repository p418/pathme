var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Path = require('path');
var VPath;
(function (_VPath) {
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
    _VPath.ENOENT = ENOENT;
    var VPath = (function () {
        function VPath(root) {
            this.root = root;
            this.cwd = this.root;
            this.path = [VPath.sep];
        }
        VPath.prototype._cd = function (attr) {
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
        VPath.prototype.cd = function (path) {
            var _this = this;
            var newPath = this.resolve(path.toString()).split(VPath.sep);
            if (newPath.length) {
                newPath.map(function (attr) {
                    _this._cd(attr);
                });
                this.path = newPath;
            }
            return this;
        };
        VPath.prototype.resolve = function (path) {
            return Path.resolve.call(null, this.toString(), path.toString());
        };
        VPath.prototype.pwd = function () {
            return Path.resolve.apply(null, ['/'].concat(this.path));
        };
        VPath.prototype.exists = function (path) {
            var _this = this;
            var aPath = this.resolve(path).split(VPath.sep);
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
        VPath.prototype.toString = function () {
            return this.pwd();
        };
        VPath.sep = '/';
        return VPath;
    })();
    _VPath.VPath = VPath;
})(VPath || (VPath = {}));
module.exports = function (obj) {
    return new VPath.VPath(obj);
};
