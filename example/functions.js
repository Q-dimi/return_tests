module.exports = [
  { 
    //type node node_modules/example/errors.js to run
    index: 'business',
    function_called: {
      on: true,
      description: 'filepath is... and',
      parameters: [[1,2], [3,5]],
      function: function (a, b) {
        try { 
          return a + b;
        } catch(err) { 
          throw new Error('something went wrong');
        } 
      }
    }, 
    unit: { 
      must_be_value: {
       on: true,
       index_exact: true,
       values: [4, 16]
      },
    }, 
  }
];

//should print 

// ERROR
// function index: 0 (business)
// parameter index: 0
// function and test execution time: 1ms
// function description: filepath is... and
// value error: '3' does not match the allowed value '4'

// ERROR
// function index: 0 (business)
// parameter index: 1
// function and test execution time: 0ms
// function description: filepath is... and
// value error: '8' does not match the allowed value '16'

//you can import all your functions at the top of the page