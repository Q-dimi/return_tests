module.exports = [
  { 
    //type node node_modules/example/errors.js to run
    index: 'business',
    function_called: {
      on: true,
      description: 'filepath is... and',
      parameters: [[2,2]],
      function: function (a, b) {
        try { 
          return {xxx: new Map([['awesome', 'cool']]), zzz: 4, a: 3, b: { c: 4, d: 55, e: 'string', f: { g: 5, h: [1,2,6, [1,2,6, [2,3,4], 5, 3], { i: 4, j: { k: 5, l: [2,3,4, {s: 4, f: { g: [123,{h: new Boolean(true), k:90, d: 78}]}}, {m: 4}, {ss: 00}], n: 66}, jj: new Number(1)}, 4,5], f: [345], o: { p: 5, q: 6} }}, zzzz: 33 }; 
        } catch(err) { 
          throw new Error('something went wrong');
        } 
      }
    }, 
    unit: { 
      must_be_value: {
        on: true,
        index_exact: false,
        values: [{ xxx: new Map([['awesome', 'cool']]), zzz: 4, a: 3, b: { c: 4, d: 55, e: 'string', f: { g: 5, h: [1,2,6, [1,2,6, [2,3,4], 5, 3], { i: 4, j: { k: 5, l: [2,3,4, {s: 4, f: { g: [123,{h: new Boolean(true), k:90, d: 78}]}}, {m: 4}, {ss: 00}], n: 66}, jj: new Number(1)}, 4,5], f: [345], o: { p: 5, q: 6} }}, zzzz: 33 }]
      },
    }, 
  }
];