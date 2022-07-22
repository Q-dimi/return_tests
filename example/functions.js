/*
  functions can be imported or required here 
  then used for function_called.function. This 
  will help for when your team keeps updating functions
  because you can loop through all of them and run all of 
  their edge cases every x hours making sure your functions 
  are always passing.
*/
module.exports = [
  { 
    /*
      indexes are optional and only used for testing certain 
      sets.
    */
    index: 1,
    /*
      standard test example. 
      compares unit.must_be_value.values array 
      with the function_called.parameters array
      AT each index. Return value from function_called.parameters[i]
      must match unit.must_be_value.values[i]. 
      type 'node example/errors.js' to see errors
    */
    function_called: {
      on: true,
      description: 'filepath is... and',
      parameters: [[2,2], [3,2]], //(fail, fail, fail, pass) \|/
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
        values: [4, 5] //(fail, fail, fail, pass) /|\
      },
    }, 
  }
];