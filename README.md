# npm i return_tests

Tests if a functions return value matches a regular expression, data type and data value.

## How To Configure

Inside 'build.js' add the directory names of the functions you would like to test from the functions folder into the configure.all_functions_to_test array

```js
const configure = {
  all_functions_to_test: [
    "./examples/example1.js",
    "./examples/example2.js",
    "./examples/example3.js",
  ],
};
```

## Where your functions which need testing live

Go to '/functions' folder and you will see some examples of how your functions are formatted. Just create a new file in that folder with the same format as the examples.

```js
module.exports = {
  tests: [
    { unit: {}, index_of_set: 1, a: 2, b: 5, c: 77 },
    { unit: {}, index_of_set: 2, a: 7, b: 5 },
    { unit: {}, index_of_set: 3, a: "hellow", b: 5 },
    { unit: {}, index_of_set: 4, a: 2, b: 5 },
    { unit: {}, index_of_set: 5, a: 2, b: 3 },
  ],

  allowed_types: {
    on: true,
    values: ["number", "BigInt"],
  },

  allowed_values: {
    on: true,
    values: [7, 12],
  },

  regex_set: {
    on: false,
    values: [],
  },

  function_called: function (a, b) {
    try {
      return a + b;
    } catch (err) {
      return err;
    }
  },

  function_type: null,

  directory: null,

  function_name: null,

  time_created: null,

  still_exists: {
    still_exists: true,
    other_possible_directories: [],
  },

  developers_assigned: [
    {
      name: null,
      email: null,
      phone: null,
    },
  ],

  end_point_hit: null,

  client_hit: null,

  description: "this function...",

  index: 1,
};
```

# Get started

Go to src folder and type npm start then go to localhost:3000 to see all the errors for each of the functions you have listed in the build.js config object.
