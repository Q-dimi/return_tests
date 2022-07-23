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
          return { a: 3, c: 6, d: { c: new Boolean(), h: ['wow', 'cool'], a: 3, t: 55, wow: function(){ return 'awesome'} } } 
        } catch(err) { 
          throw new Error('something went wrong');
        } 
      }
    }, 
    unit: { 
      must_be_value: {
        on: true,
        index_exact: true,
        values: [{ a: 3, c: 6, d: { a: 3, t: 55, wow: function(){ return 'awesome'} } } , 6]
      },
    }, 
  }
];