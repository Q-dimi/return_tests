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
          return 2;
        } catch(err) { 
          throw new Error('something went wrong');
        } 
      }
    }, 
    unit: { 
      must_be_log_of: {
       on: true,
       index_exact: true,
       values: [[4, 16]]
      },
    }, 
  }
];