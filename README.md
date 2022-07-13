# return-tests

return-tests tests if a functions return value matches a regular expression, data type and data value.

# How it works

An array of objects, each representing one function is passed to a testing function.
The testing function accepts the object (function), runs a test on the function,
and returns a value. The return value is then checked for correctness and errors are displayed.

1. pass functions to testing function (return_tests.run)
2. For each index, function_called.parameters is looped over. Each set of parameters spits back a return value.
3. The return value is checked against unit.allowed_types.values, unit.allowed_values.values, unit.regex_set.values
4. If there are any errors, they will display after execution

See /examples for details

# Getting Started

To view all your errors across all the functions you are testing

```js
var return_tests = require("return_tests");
var functions = require("my_testing_functions");

var errors;

try {
  errors = return_tests.run(functions);
} catch (err) {
  console.log(err.message);
}
```

# Creating Functions (in progress)

If you dont feel like writing out all the functions, run the below
and a functions file will be created for you. Objects are horizontally
formatted.

```js
var return_tests = require("return_tests");
return_tests.generate_functions("./file_written_to", {
  folders: "",
  functions: ['regular', 'named', 'arrow'] //...
  files: [],
});
```

# Functions

These are all of your functions as an array you are testing.
They can be created via the above or yourself.

```js
module.exports = [
  {
    function_called: {
      on: true,
      name: "apple",
      filepath: "/sauce",
      description: "apple sauce",
      param_names: "apple, sauce",
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
    index_of_set: 1,
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
