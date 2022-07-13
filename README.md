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

    @param {unit.allowed_types unit.allowed_values unit.regex_set: object}: 
    the allowed types, values and expressions the function must return and pass

    @param {unit.on}: 
    whether or not to run the allowed types test on the return value

    @param {unit.index_exact}: 
    check for a match on the entire array or check for a match on the 
    exact index (function_called.parameters vs unit.values)

    @param {.values}: 
    types that must be returned

  */

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
