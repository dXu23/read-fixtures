import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import Fixtures from '../src/index';
var fx = new Fixtures();
// console.log(JSON.stringify(fx, null, 2));
/*
console.log(fx);

console.log(fx.orders);
console.log(fx.users);
console.log((fx.users as any)['male']);
*/
// console.log(fx.users?.female);
var fixtureSuite = suite('Fixture tests');
fixtureSuite('Fixtures loaded', function () {
    assert.ok(fx.orders != null);
    assert.ok(fx.users != null);
    assert.not.ok(fx.products);
});
fixtureSuite('Can access fixture data', function () {
    // let UserObj: { [key: string]: Person } = fx.users;
    assert.ok(fx.users.male != null);
    assert.ok(fx.users.female != null);
    assert.not.ok(fx.users.ovni);
    assert.ok(fx.users.male.type != null);
    assert.ok(fx.users.female.type != null);
    assert.not.equal(fx.users.female.type, (fx.users.male.type));
});
fixtureSuite('Clone works on array', function () {
    assert.instance(fx.grandparents.pa1.childs, Array);
    assert.instance(fx.grandparents.pa1.childs[0].grandchilds, Array);
});
fixtureSuite('Handles correctly on null values', function () {
    assert.ok(fx.orders.order1.manufacturer === null);
});
fixtureSuite.run();
//# sourceMappingURL=fixtures.js.map