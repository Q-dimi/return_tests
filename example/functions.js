/*
  functions can be imported or required here 
  then used for function_called.function. This 
  will help for when your team keeps updating functions
  because you can loop through all of them and run all of 
  the edge cases every x hours making sure your functions 
  are always passing.
*/
module.exports = [
  { 
    /*
      standard test example. 
      compares unit.allowed_values.values array 
      with the function_called.parameters array
      AT each index. Return value from function_called.parameters[i]
      must match unit.allowed_values.values[i]. 
      type 'node example/errors.js' to see errors
    */
    function_called: {
      on: true,
      description: 'function Name / function Filepath / function Description / function parameter names',
      parameters: [[2, 6], [3, 2], [3, 23], [22, 22]], //(fail, fail, fail, pass)
      function: function (a, b) {
        try { 
          return a + b; 
        } catch(err) { 
          return err; 
        } 
      }
    }, 
    unit: { 
      allowed_values: {
        on: true,
        index_exact: true,
        values: [{a: '3'}, 12, 'hello world', 44] ////(fail, fail, fail, pass)
      }, 
    }  
  },
];