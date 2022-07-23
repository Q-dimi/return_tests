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
          return { a: 3, b: { d: 4, h: 55, l: 'string', v: { a: 5, c: { d: 5, g: 6} }} }; 
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