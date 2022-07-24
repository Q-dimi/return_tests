module.exports = [
  { 
    //type node node_modules/example/errors.js to run
    index: 'business',
    function_called: {
      on: true,
      description: 'filepath is... and',
      parameters: [[2,2], [3,2]],
      function: function (a, b) {
        try { 
          return { zzz: 4, a: 3, b: { c: 4, d: 55, e: 'string', f: { g: 5, h: [1,2, [1,2,3, [2,3,4], 5, 6], { i: 4, j: { k: 5, l: [2,3,4, {m: 4}, {s: 4}, {ss: 00}], n: 66}}, 4,5], o: { p: 5, q: 6} }}, zzzz: 33 }; 
        } catch(err) { 
          throw new Error('something went wrong');
        } 
      }
    }, 
    unit: { 
      must_be_value: {
        on: true,
        index_exact: true,
        values: [{ a: 3, b: { d: 4, h: 55, l: 'string', v: { a: 5, c: { d: 5, g: 6} }} } , 6]
      },
    }, 
  }
];