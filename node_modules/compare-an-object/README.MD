# compare-an-object

This is a function that can compare two objects to their deepest level in any order (arrays or objects only) (no prototype). Does not support WeakSet and WeakMap (will throw an error). Converts map and set to object (make sure format of map and set is correct "new Set([]) new Map([])"). See example for test.

```
npm i compare-an-object
```

```js
const compare = require("./index");

var a = {
  cmn: new Date("10-12-23"),
  ll: new Map([
    ["dsdsd", "awesome"],
    ["ssd", "sweer"],
  ]),
  a: 3,
  b: {
    c: 4,
    we: new Set([["cool"], ["awesome"]]),
    d: 55,
    e: "cool",
    f: {
      g: 5,
      h: [
        1,
        2,
        [
          1,
          2,
          6,
          { a: 3, b: [1, 2, 3, { f: { a: [1, 3, {}, {}] } }] },
          [2, 3, 4],
          5,
          3,
        ],
        {
          i: 4,
          j: {
            k: 5,
            l: [
              2,
              3,
              4,
              { s: 4, f: { g: [123, { h: new Boolean(true), k: 90, d: 78 }] } },
              { m: 4 },
              { ss: 00 },
            ],
            n: 66,
          },
          jj: new Number(1),
        },
        4,
        5,
      ],
      f: [345],
      o: { p: 5, q: 6 },
    },
  },
  zzzz: 33,
  f: { pp: [1, { a: 4 }, 3] },
  skjs: function () {
    return "hello world";
  },
  zzz: 4,
};
var b = {
  ll: new Map([
    ["dsdsd", "awesome"],
    ["ssd", "sweer"],
  ]),
  zzz: 4,
  cmn: new Date("10-12-23"),
  a: 3,
  b: {
    c: 4,
    d: 55,
    e: "cool",
    we: new Set([["cool"], ["awesome"]]),
    f: {
      g: 5,
      h: [
        1,
        2,
        [
          1,
          2,
          6,
          { a: 3, b: [1, 2, 3, { f: { a: [1, 3, {}, {}] } }] },
          [2, 3, 4],
          5,
          3,
        ],
        {
          i: 4,
          j: {
            k: 5,
            l: [
              2,
              3,
              4,
              { s: 4, f: { g: [123, { d: 78, k: 90, h: new Boolean(true) }] } },
              { ss: 00 },
              { m: 4 },
            ],
            n: 66,
          },
          jj: new Number(1),
        },
        4,
        5,
      ],
      f: [345],
      o: { p: 5, q: 6 },
    },
  },
  zzzz: 33,
  f: { pp: [1, { a: 4 }, 3] },
  skjs: function () {
    return "hello world";
  },
};

var result = compare(a, b); //maps must be formatted correctly or else error will be thrown
console.log(result); //returns true
```
