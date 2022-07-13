
/*
  The functions you are passing to the run() function. 
*/

module.exports = [

  { 

    /*
      randomized creates a random set of parameter sets 
      that replace function_called.parameters 
      during execution. 
    */

    randomized: {

      /*
        if randomized.on is true, creates 
        the random parameters at this function index
      */

      on: true,

      /*
        string, null, undefined, boolean,
        object, number, random, array
      */

      parameters: ['object', 'undefined'],

      /*
        string, null, undefined, 
        boolean, number 
      */  

      when_arr_passed: ['number', 'string'],

      /*
        string, null, undefined, boolean,
        number
      */  

      when_obj_passed: [{parameter_type: 'number', parameter_name: 'awesome'}],

      /*
        the amount of parameter sets created
        [[1,2][4,'hello'][{name: "hello world"},7]]
      */  

      multiply_amount: 3

    },  

    /*
      function_called is the 
      function in your application you are testing
    */

    function_called: {

      /*
        if true, loops through function_called.parameters
        and runs tests for each set of parameters
      */

      on: true,

      /*
        name of function
      */

      name: 'apple',

      /*
        filepath of function 
        (automatically generated with generate function)
      */

      filepath: '/sauce',

      /*
        description of function
      */

      description: 'apple sauce',

      /*
        names of parameters
      */

      param_names: 'apple, sauce',

      /*
        each set of parameters passed to the function
        (will add a random here for one random and get rid of random.on)
      */

      parameters: [[1, 10], [10, 1]], //(make the randomized thing here)

      /*
        your function 
      */

      function: function (a, b) {
        try { 
          return a + b; 
        } catch(err) { 
          return err; 
        } 
      }

    }, 

    /*
      unit are the three unit tests executed 
      on the return_value
    */
    
    unit: { 

      /*
        the allowed types the function must return
      */

      allowed_types: {

        /*
          whether to run this test
        */

        on: false,

        /*
          check for a match on the entire array 
          or check for a match on the exact index
        */

        index_exact: false,

        /*
          types that must be returned
        */

        values: ['string', 'number']

      }, 

      /*
        the allowed values the function must return
      */
      
      allowed_values: {

        /*
          whether to run this test in execution
        */

        on: true,

        /*
          check for a match on the entire array 
          or check for a match on the exact index
        */

        index_exact: false,

        /*
          values that must be returned
        */

        values: [12, 12]

      }, 

      /*
        the regular expressions the function must pass
      */
      
      regex_set: {

        /*
          whether to run this test in execution
        */

        on: false,

        /*
          check for a match on the entire array 
          or check for a match on the exact index
        */

        index_exact: true,

        /*
          regular expressions being tested 
          against for each returned value
        */

        values: [/^([0-9])$/, /^([0-9])$/]

      } 
    
    }, 

    /*
      index of the function (needed!)
    */
    
    index_of_set: 1 
  
  },

];