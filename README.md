# return-tests

return-tests tests if a functions return value matches a regular expression, data type and data value.

# Getting Started

To view all your errors across all the functions you are testing

```js
var return_tests = require("return_tests");
var functions = require("my_testing_functions");

var errors = [];

try {
  errors = return_tests.run(functions);
} catch (err) {
  console.log(err.message);
}

console.log(errors);
```

# Creating Functions

If you dont feel like writing out all the functions, run the below
and a functions file with all your functions will be created for you.

```js
var return_tests = require("return_tests");
return_tests.generate_functions("./file_written_to", {
  folders: "",
  files: [],
});
```

# Functions

These are all of your functions as an array you are testing. They can be created via the above or yourself.

```js
/*
  The functions you are passing to the run() function. /my_testing_functions.js
*/

module.exports = [
  {
    /*
      randomized creates a random set of parameter sets 
      using randomized.parameters that replace function_called.parameters 
      during execution. 
    */

    randomized: {
      /*
        if randomized.on is true, 
        creates the random parameters 
        at this function index
      */

      on: false,

      /*
        string, null, undefined, 
        boolean, object, number, 
        random (these are the input parameters)
      */

      parameters: ["number", "number"],

      /*
        string, null, undefined, 
        boolean, number
      */

      when_arr_passed: ["number", "string"],

      /*
        string, null, undefined,
        boolean, number
      */

      when_obj_passed: [
        { parameter_type: "number", parameter_name: "awesome" },
      ],

      /*
        the amount of parameter sets created 
        --> [[1,2][4,3][5,7]] 
        replaces function_called.parameters 
        during execution
      */

      multiply_amount: 3,
    },

    /*
      function_called is the
      function in your application 
      you are testing
    */

    function_called: {
      /*
        if true, loops 
        through function_called.parameters 
        and runs tests for 
        each set of parameters
      */

      on: true,

      /*
        name of function
      */

      name: "apple",

      /*
        filepath of function 
        (automatically generated with generate function)
      */

      filepath: "/sauce",

      /*
        description of function
      */

      description: "apple sauce",

      /*
        names of parameters
      */

      param_names: "apple, sauce",

      /*
        set of parameters passed.
        each array is the parameters
        passed to function_called.function 
        (tests will be executed for each set of parameters)
      */

      parameters: [
        [1, 10],
        [10, 1],
      ],

      /*
        your function 
        (generate will append all 
        functions in selected directories)
      */

      function: function (a, b) {
        try {
          return a + b;
        } catch (err) {
          return err;
        }
      },
    },

    /*
      unit are the three unit tests 
      executed for each parameter 
      set in function_called.parameters. 
      when looping through 
      function_called.parameters, 
      each set is tested against the below units. 
      (if on)
    */

    unit: {
      /*
        the allowed types the
        function must return
      */

      allowed_types: {
        /*
          whether to run this test
        */

        on: false,

        /*
          allowed_values.values[index] must match
          the return value index of 
          function_called.parameters[index] 
          otherwise will check entire array for match
        */

        index_exact: false,

        /*
          one of the types that must be returned
        */

        values: ["string", "number"],
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
          allowed_values.values[index] must 
          match the return value index of 
          function_called.parameters[index] 
          otherwise will check entire array for match
        */

        index_exact: false,

        /*
          one of the values the
          function must return 
          add trim middle
        */

        values: [12, 12],
      },

      /*
        the regular expressions 
        the function must return 
        (must pass all regular expressions or one)
      */

      regex_set: {
        /*
          whether to run this test in execution
        */

        on: false,

        /*
          allowed_values.values[index] must 
          match the return value index of 
          function_called.parameters[index] 
          otherwise will check entire array for match
        */

        index_exact: true,

        /*
          regular expression being 
          tested against for each returned value
        */

        values: [/^([0-9])$/, /^([0-9])$/],
      },
    },

    /*
      index of the function (needed!)
    */

    index_of_set: 1,
  },
];
```
