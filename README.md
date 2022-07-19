# return-tests

return-tests loops through functions and runs as many parameterized tests per function that you add ([[4, 8], [10, 2]]). After a function executes a test case, its return value is compared against any of the chosen
unit tests you have added. The three tests are listed below in the unit object with more to come.

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
    function index name: name of index for running and testing certain sets (optional)
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
      values must be defined. If you want to add a test, check out /tests 
      tests you can add (see contributing): (isLength, isLengthGreaterThan, isLengthLessThan, isEvenOrOdd...)
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
      is_greater_than: {
        on: false,
        index_exact: true,
        values: [2, 5, 8],
      },
      is_less_than: {
        on: false,
        index_exact: true,
        values: [2, 5, 8],
      },
      in_range: {
        on: false,
        index_exact: true,
        values: [
          [2, 6],
          [1, 7],
          [2, 8],
        ],
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
This is used so that you dont have to keep setting functions on and off and to know what to control 
f for when something fails. Pass an index set to the run function, and only those
functions with indexeswill be run. See /example/errors.js

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

@param {unit.x: object}:
the object containing the test the function must return

@param {unit.x.on: boolean}:
whether or not to run the test

@param {unit.x.index_exact: boolean}:
check for a match or fact across the entire array or check for a match or fact on the
exact index

@param {unit.x.values: array}:
values that the return value for each parameter set compares itself to

*/
```

# Working Sets

To view your errors live in a page, use working sets. Spin up a terminal and type node 'filepath'
and your errors will display in node_modules/return_tests/yourkey.html

```js
var live_changes = require("../lib/listen");

/*
  index_a.html will show all path errors where path is set 
  of functions like /example/functions.js ...keep the html pages
  open that are live and use them to view errors when making changes
*/

live_changes.set_working_set({
  index_a: { on: true, paths: ["../example/functions.js"], errors: [] },
  index_b: { on: true, paths: ["../example/functions.js"], errors: [] },
});

/*
  starts writing errors to file
*/

try {
  live_changes.start_interval();
} catch (err) {
  console.log(err.message);
}

/*
  gets the current working set
*/

live_changes.get_working_set();

/*
  checks if the interval is running (pages being displayed)
*/

live_changes.interval_status();

/*
  stops listening for changes (same as ctrl c) <- leave interval on to view changes and dont do this
*/

live_changes.stop_interval();
```

# Uses

return-tests works well for functions that need to pass many test cases. return-tests will loop
through functions and for each, input many sets of parameters.
Every return value from each set of parameters is compared to one of the unit
object tests you have added. Errors are displayed as a string. For best use, set every function to
on and use index sets so that you get to decide what to run.

# Fork Me

return-tests is a small project I decided to make because I could not find anything similar.
Although just started and not anywhere near completion, if you feel return-tests is useful, fork it and
add it to your already existing testing framework.
