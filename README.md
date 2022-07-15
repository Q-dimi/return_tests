# return-tests

return-tests loops through functions and runs as many parameterized tests per function that you add ([[4, 8], [10, 2]]).
After a function executes a test case, its return value is compared against any of the chosen
unit tests you have added. The three tests are listed below in the unit object.

```sh
npm i return-tests
```

# Getting Started

Pass an array of functions (see Function Format below) to the 'run' function and view your errors. For
a standard testing example see /example/functions.js

```js
var return_tests = require("return-tests");
var functions = require("my_testing_functions");

//only run math functions
var index_set_A = ["math"];
//only run business functions
var index_set_B = ["business"];
//only run to do functions
var index_set_C = ["todo"];
//run math and business
var index_set_D = ["math", "business"];

var errors = [];

try {
  errors = return_tests.run(functions /*,index_set_A*/); //only run functions containing a 'math' index (optional)
} catch (err) {
  console.log(err.message);
}

for (let i = 0; i < errors.length; i++) {
  console.log(errors[i]);
  /*
    "function index: index where the function failed
    parameter index: parameter index where the function failed (function_called.parameters)
    value error: error from unit.allowed_values.values
    type error: error from unit.allowed_types.values
    regex_error: error from unit.regex_set.values"
  */
}
```

<!-- # ~~~Creating Functions~~~

```js
var return_tests = require("return_tests");
return_tests.generate_functions("./file_written_to", {
  folders: "",
  functions: ['regular', 'named', 'arrow'] //...
  files: [],
});
``` -->

# Function Format

```js
module.exports = [
  {
    /*
      indexes are optional and only used for testing certain
      sets.
    */
    index: 1,
    index: 'djdjdsdd'
    function_called: {
      on: true,
      description: "this function adds numbers",
      /*
        each parameter set is passed
        to the function and a return value
        is tested against the unit objects
        which are on
      */
      parameters: [
        [1, 10],
        [10, 1],
      ],
      function: function (a, b) {
        try {
          return a + b;
        } catch (err) {
          return err;
        }
      },
    },
    /*
      if unit.x.on is true, return value of function_called.function is tested against
      unit.x.values. You may remove tests you dont need (unit.x) but the unit object
      itself must exist during execution. When using a test, on, index_exact and
      values must be defined.
    */
    unit: {
      allowed_types: {
        on: false,
        index_exact: false,
        values: ["string", "number"],
      },
      allowed_values: {
        on: true,
        index_exact: false,
        values: [12, 12],
      },
      regex_set: {
        on: false,
        index_exact: true,
        values: [/^([0-9])$/, /^([0-9])$/],
      },
    },
  },
];
```

# Parameters

```js
/*
@param {index: optional}:
index is an optional value you can use when testing different sets or individual functions. 
This is used so that you dont have to keep setting functions on and off.
Pass an index set to the run function, and only those functions with indexes
will be run. See /example/errors.js

@param {function_called: object}:
function_called is the object containing the function in your application you are testing

@param {function_called.on: boolean}:
if true, loops through function_called.parameters and runs tests for each return value

@param {function_called.description: string}:
description of the function

@param {function_called.parameters: array}:
the sets of parameters passed to the function during execution

@param {function_called.function: function}:
the function you are testing

@param {unit: object}:
unit contains the three objects for testing (more tests will be added)

@param {unit.allowed_types: object}:
the object containing the allowed types the function must return

@param {unit.allowed_types.on: boolean}:
whether or not to run the allowed types test on the return value 

@param {unit.allowed_types.index_exact: boolean}:
check for a match across the entire array or check for a match on the
exact index (function_called.parameters vs unit.allowed_types.values)

@param {unit.allowed_types.values: array}:
types that must be equal to the return value of function_called.function

@param {unit.allowed_values: object}:
the object containing allowed values the function must return

@param {unit.allowed_values.on: boolean}:
whether or not to run the allowed values test on the return value

@param {unit.allowed_values.index_exact: boolean}:
check for a match across the entire array or check for a match on the
exact index (function_called.parameters vs unit.allowed_values.values)

@param {unit.allowed_values.values: array}:
values that must be equal to the return value of function_called.function

@param {unit.regex_set: object}:
the object containing the regular expressions the function must pass

@param {unit.regex_set.on}:
whether or not to run the regular expressions test on the return value

@param {unit.regex_set.index_exact: boolean}:
check for a match across the entire array or check for a match on the
exact index (function_called.parameters vs unit.regex_set.values)

@param {unit.allowed_values.regex_set: array}:
regular expressions the return value must pass
*/
```

# Uses

return-tests works well for functions that need to pass many test cases. return-tests will loop
through every function and for each function, throw many sets of parameters at it.
Every return value from each set of parameters is compared against one of the unit
object tests you have added. Errors are displayed as a string. For best use, set every function to
on and use index sets so that you get to decide what to run.
