import { dirname, join } from 'path';
import { existsSync, readdirSync, readFileSync } from 'fs';

function trunc(str: string, n: number) {
    return str.substring(0, str.length - n);
}

interface FixInterface {
    [fileName: string]: Object | undefined;
}

let _fixtures = {};

export default class Fixtures implements FixInterface {
    [fileName: string]: Object | undefined;

    constructor(fpath = './tests/fixtures') {
        let fixtures: Record<string, Object> = {};
        if (!existsSync(fpath)) {
            throw new Error('fixtures path not found!');
        }

        const files = readdirSync(fpath);
        let fname = '';
        files.forEach((file: string) => {
            if (file.endsWith('.json')) {
                fname = trunc(file, 5);
            } else if (file.endsWith('.js')) {
                fname = trunc(file, 3);
            }
            if (fname) {
                fixtures[fname] = JSON.parse(readFileSync(join(fpath, file), 'utf8'));
            }
        });

        _fixtures = fixtures;
        this.reset();
    }

    private clone(param: Object | undefined): Object | undefined {
        let result: Object | undefined;

        if (typeof param === 'undefined') {
            return undefined;
        } else if (param instanceof Array) {
            result = [];
        } else if (typeof param === 'object' && param != null) {
            result = {};
        } else {
            return param;
        }

        for (const i in param) {
            (result as any)[i] = this.clone((param as any)[i]);
        }

        return result;
    }

    public reset() {
        let fxs = this.clone(_fixtures);

        for (const i in fxs) {
            if (fxs.hasOwnProperty(i)) {
                (this as any)[i] = (fxs as any)[i];
            }
        }
    }
}

