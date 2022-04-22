# npm return_tests

Tests if a functions return value matches a regular expression, data type and data value each or seperately.

# Files

Go to '/src' file and run npm start. There are four files which are 'live_eindexrrors', 'db_functions', 'create_function', 'edit_function', 'view_working_set.'

- Express view - index: all the errors which are currently live. click on run to run errors for set selected.
- Express view: db_functions: all the functions that are being tested with their current config properties in '/functions'
- Express view: create_function: create a function on the back end with the params in examples folder
- Express view: edit_function: edit your function on your back end
- Express view: view_working_set: view the working set you are on

## How To Configure

Inside 'build.js', you will see a config object at the top. The directions are plain. Change the object file for the directory you want to hit. There is already one set for you. The config object in build.js is listed as...

```js
const configure = {
  fail_on_config: true,

  all_functions_to_test: [
    "./examples/example1.js",
    "./examples/example2.js",
    "./examples/example3.js",
  ],

  db: {
    pull_functions: { file: "./src/routes/pull_config" },
  },
};
```

## Where your functions which need testing live

Go to '/examples' folder and you will see some examples of how your functions are formatted. Each function is created on the back end.

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

  run_all: true,

  updated_function_if_match_in_fname_and_directory: null,

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

## The end

For you to get this to work, type npm return_tests and visit the ''src' directory and run npm start and go to localhost:3000
