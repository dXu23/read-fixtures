import { suite, test } from 'uvu';
import * as assert from 'uvu/assert';

import Fixtures from '../src/index';

const fx = new Fixtures();

interface Person {
  name: string;
  type: string;
}

interface Order {
  product: string;
  manufacturer: string;
}

// console.log(JSON.stringify(fx, null, 2));
/*
console.log(fx);

console.log(fx.orders);
console.log(fx.users);
console.log((fx.users as any)['male']);
*/
// console.log(fx.users?.female);

const fixtureSuite = suite('Fixture tests');

fixtureSuite('Fixtures loaded', () => {
    assert.ok(fx.orders != null);
    assert.ok(fx.users != null);

    assert.not.ok(fx.products);
});

fixtureSuite('Can access fixture data', () => {
    // let UserObj: { [key: string]: Person } = fx.users;
    assert.ok((fx.users as any).male != null);
    assert.ok((fx.users as any).female != null);

    assert.not.ok((fx.users as any).ovni);

    assert.ok(((fx.users as any).male as Person).type != null);
    assert.ok(((fx.users as any).female as Person).type != null);

    assert.not.equal(((fx.users as any).female as Person).type, (((fx.users as any).male as Person).type));
});

fixtureSuite('Clone works on array', () => {
    assert.instance(((fx.grandparents as any).pa1 as any).childs, Array);
    assert.instance((((fx.grandparents as any).pa1 as any).childs[0] as any).grandchilds, Array);
});

fixtureSuite('Handles correctly on null values', () => {
    assert.ok(((fx.orders as any).order1 as Order).manufacturer === null);
});

fixtureSuite.run();


