# compare-an-object

This is a function that can compare two arrays or objects in any order at their deepest level with 100% accuracy.

```
npm i compare-an-object
```

```js
const compare = require("./index");

var a = {
  cmn: new Date("10-12-23"),
  ll: new Map([
    ["dsdsd", "awesomep"],
    ["ssd", { a: [123] }],
  ]),
  a: 3,
  b: {
    c: 4,
    we: new Set(["cool", "awesome", "sd"]),
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
    ["dsdsd", "awesomep"],
    ["ssd", { a: [123] }],
  ]),
  zzz: 4,
  cmn: new Date("10-12-23"),
  a: 3,
  b: {
    c: 4,
    d: 55,
    e: "cool",
    we: new Set(["cool", "awesome", "sd"]),
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
              { s: 4, f: { g: [123, { k: 90, d: 78, h: new Boolean(true) }] } },
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

var result = compare(a, b); //make sure all values are formatted correctly
console.log(result); //returns true
```

(Does not support WeakSet and WeakMap) Sets are converted to arrays. Maps converted to objects.
