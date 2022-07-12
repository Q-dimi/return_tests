var return_tests = require('return_tests');

var functions = [

  { 

    /*
      randomized creates a random set of parameter sets 
      using randomized.parameters that replace function_called.parameters 
      during execution. 
    */

    randomized: {

      on: false, // if randomized.on is true, creates the random parameters at this function index

      parameters: ['number', 'number'], //string, null, undefined, boolean, object, number, random (these are the input parameters)

      when_obj_passed: ['number', 'string'], //string, null, undefined, boolean, number (if randomized.parameters includes object keyword, this creates object with number and string value)

      when_arr_passed: ['number', 'string'], //string, null, undefined, boolean, number (if randomized.parameters includes array keyword, creates an array with number and string value)

      multiply_amount: 3 //the amount of parameter sets created --> [[1,2][4,3][5,7]] --> this replaces function_called.parameters during execution (if randomized.on is true)

    },  

    /*
      function_called is the function in your application you are testing
    */

    function_called: {

      on: true, //if true, loops through function_called.parameters and runs tests for each set of parameters

      name: 'apple', //name of function

      filepath: '/sauce', //filepath of function (automatically generated with generate function)

      description: 'apple sauce', //description of function

      param_names: 'apple, sauce', //names of parameters

      parameters: [[1, 10], [2, 9]], //set of parameters passed. each array is the parameters passed to function_called.function (tests will be executed for each set of parameters)

      function: function (a, b) { //your function (generate will append all functions in selected directories)
        try { 
          return a + b; 
        } catch(err) { 
          return err; 
        } 
      }

    }, 

    /*
      unit are the three unit tests executed for each parameter set in function_called.parameters. 
      when looping through function_called.parameters, each set is tested against the below units (if unit set to on)
    */
    
    unit: { 

      allowed_types: {  //the allowed types the function must return

        on: false, //whether to run this test

        index_exact: false, //allowed_values.values[index] must match the return value index of function_called.parameters[index] otherwise will check entire array for match

        values: ['number'] //one of the types that must be returned

      }, 
      
      allowed_values: { //the allowed values the function must return

        on: false, //whether to run this test in execution

        index_exact: false, //allowed_values.values[index] must match the return value index of function_called.parameters[index] otherwise will check entire array for match

        values: [7, 12] //one of the values the function must return

      }, 
      
      regex_set: { //the regular expressions the function must return

        on: true, //whether to run this test in execution

        index_exact: false, //allowed_values.values[index] must match the return value index of function_called.parameters[index] otherwise will check entire array for match

        values: [/^([0-9])$/] //regular expression being tested against for each returned value 

      } 
    
    }, 
    
    index_of_set: 1 //index of the function (needed!)
  
  },

];

var errors = [];

try { 
  errors = return_tests.run(functions);
} catch(err) { 
  console.log(err.message)
}

console.log(errors);