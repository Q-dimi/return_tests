# return-tests

return-tests tests if a functions return value matches a regular expression, data type and data value.

# Getting Started

```js
var return_tests = require("return_tests");
var functions = require("my_testing_functions");

var errors = [];

try {
  errors = return_tests.run(functions);
} catch (err) {
  console.log(err.message);
}

for (let i = 0; i < errors.length; i++) {
  console.log(errors[i]);
  //string with function index, parameter index, and types of errors (type, value, regex)

  //function index: index where function is
  //parameter index: parameter index where the function failed (function_called.parameters)
  //value error: allowed_types.values
  //type error: allowed_types.values
  //regex_error: regex_set.values

  //(when viewing errors, go to the function index then function_called.parameters index. Then compare the value with unit.allowed_x
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
    function_called: {
      on: true,

      name: "apple",

      filepath: "/sauce",

      description: "apple sauce",

      param_names: "apple, sauce",

      /*
        each parameter set is passed
        to the function and a return value
        is tested against the unit objects
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
        return value of function_called.function is tested against
        allowed_types.values, allowed_values.values, regex_set.values.
    */

    unit: {
      allowed_types: {
        on: false,
        index_exact: false, //if true function_called.parameters and allowed_types.values index is matched
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
@param {function_called: object}:
function_called is the function in your application you are testing

@param {function_called.on: boolean}:
if true, loops through function_called.parameters and runs tests for each set of parameters

@param {function_called.name: string}:
name of the function

@param {function_called.file_path: string}:
filepath of the function

@param {function_called.description: string}:
description of the function

@param {function_called.param_names: string}:
the names of the parameters of the function

@param {function_called.parameters: array}:
the sets of parameters passed to the function during execution

@param {function_called.function: function}:
the function you are testing

@param {unit: object}:
unit are the three unit tests executed on the return_value

@param {unit.allowed_types: object}:
the allowed types the function must return

@param {unit.allowed_values: object}:
the allowed values the function must return

@param {unit.regex_set: object}:
the regular expressions the function must pass

@param {unit.allowed_types.on}:
whether or not to run the allowed types test on the return value

@param {unit.allowed_values.on}:
whether or not to run the allowed values test on the return value

@param {unit.regex_set.on}:
whether or not to run the regular expressions test on the return value

@param {unit.allowed_types.index_exact}:
check for a match on the entire array or check for a match on the
exact index (function_called.parameters vs unit.allowed_types.values)

@param {unit.allowed_values.index_exact}:
check for a match on the entire array or check for a match on the
exact index (function_called.parameters vs unit.allowed_values.values)

@param {unit.regex_set.index_exact}:
check for a match on the entire array or check for a match on the
exact index (function_called.parameters vs unit.regex_set.values)

@param {unit.allowed_types.values}:
types that must be returned (one or all)

@param {unit.allowed_values.values}:
values that must be returned (one or all)

@param {unit.allowed_values.regex_set}:
regular expressions that must pass (one or all)
*/
```
