"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uvu_1 = require("uvu");
var assert = __importStar(require("uvu/assert"));
var index_1 = __importDefault(require("../src/index"));
var fx = new index_1.default();
// console.log(JSON.stringify(fx, null, 2));
/*
console.log(fx);

console.log(fx.orders);
console.log(fx.users);
console.log((fx.users as any)['male']);
*/
// console.log(fx.users?.female);
var fixtureSuite = (0, uvu_1.suite)('Fixture tests');
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