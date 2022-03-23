import { join } from 'path';
import { existsSync, readdirSync, readFileSync } from 'fs';
function trunc(str, n) {
    return str.substring(0, str.length - n);
}
var _fixtures = {};
var Fixtures = /** @class */ (function () {
    function Fixtures(fpath) {
        if (fpath === void 0) { fpath = './tests/fixtures'; }
        var fixtures = {};
        if (!existsSync(fpath)) {
            throw new Error('fixtures path not found!');
        }
        var files = readdirSync(fpath);
        var fname = '';
        files.forEach(function (file) {
            if (file.endsWith('.json')) {
                fname = trunc(file, 5);
            }
            else if (file.endsWith('.js')) {
                fname = trunc(file, 3);
            }
            if (fname) {
                fixtures[fname] = JSON.parse(readFileSync(join(fpath, file), 'utf8'));
            }
        });
        _fixtures = fixtures;
        this.reset();
    }
    Fixtures.prototype.clone = function (param) {
        var result;
        if (typeof param === 'undefined') {
            return undefined;
        }
        else if (param instanceof Array) {
            result = [];
        }
        else if (typeof param === 'object' && param != null) {
            result = {};
        }
        else {
            return param;
        }
        for (var i in param) {
            result[i] = this.clone(param[i]);
        }
        return result;
    };
    Fixtures.prototype.reset = function () {
        var fxs = this.clone(_fixtures);
        for (var i in fxs) {
            if (fxs.hasOwnProperty(i)) {
                this[i] = fxs[i];
            }
        }
    };
    return Fixtures;
}());
export default Fixtures;
//# sourceMappingURL=index.js.map