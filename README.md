# npm return_tests

Tests if a functions return value matches a regular expression, data type and data value each or seperately.

# Files

Go to '/src' file and run npm start. There are four files which are 'live_errors', 'config', 'db_errors', 'db_functions.'

- Express view: live_errors: all the errors which are currently live
- Express view: config: The configuration object properties in build.js (see below)
- Express view: db_errors: All the errors pushed to the database that when resolved via live_errors, can be resolved by clicking resolve
- Express view: db_functions: all the functions that are being tested with their current config properties in '/functions'

## How To Configure

Inside 'build.js', you will see a config object at the top. The directions are plain. Change the object how you wish in this file or change it via the config express view file in '/src' only if your db is set up in 'db.js'. The config object in build.js is listed as...

```js
/*

@param {single_function_to_test: string}: one file to test that you choose.

@param {test_all: boolean}: whether to test all files or not.

@param {all_functions_to_test: array}: all the files which have a function to test.

@param {scan_and_create_files: object}: scan files for functions and create files with those functions and push those to db

@param {db: object}: database for config, pushing errors and pushing obect functions to db.

*/

const configure = {
  test_all: true,

  single_function_to_test: "./functions/example2.js",

  all_functions_to_test: [
    "./functions/example1.js",
    "./functions/example2.js",
    "./functions/example3.js",
  ],

  scan_and_create_files: {
    run: false,
    push_to_all_functions_to_test: false,
    directories: [],
    files: [],
  },

  db: {
    on: false,
    file_pull_config: "./src/routes/pull_config",
    file_push_functions: "./src/routes/push_functions",
    file_push_errors: "./src/routes/push_errors",
  },
};
```

## Where your functions which need testing live

Go to '/functions' folder and you will see some examples of how your functions are formatted. Each file represents a single function and is listed as...

```js
/*

@param {tests: array}: test sets passed in as parameters

@param {allowed_types: object}: types allowed to be returned

@param {allowed_values: object}: values allowed to be returned

@param {regex_set: object}: if return value matches all in the regex set (could just use this)

@param {function_called: function}: function created by programmer that is checked via tests. Each file gets its own function.

@param {function_type: string}: regular or arrow function

@param {directory: string}: directory name where the function lives.

@param {function_name: string}: name of the function in the directory you got it from.

@param {time_created: string}: the time the file was created.

@param {still_exists: object}: whether the function in that file exists and whether it should be created again. Determined by @param {scan} in build.js

@param {run_all: boolean}: when running tests for all files, run_all is checked and if false does not run. it true runs file

@param {updated_function_if_no_match: function}: if scan finds function, make sure the function matches the function_called . if not, push the updated file function here.

@param {unit: object}: must be defined. takes three params which are objects with the same names as allowed_types, allowed_values, regex_set...same thing

@param {index_of_set: number}: the index of the error set

@param {developers: array}: the developers assigned

@param {end_point_hit: string}: end point hit

@param {client_hit: string}: client_hit

@param {description: string}: description of the function

@param {index: number}: index of file

***unit as object and index_of_set as number must be initialized to pass tests

*/

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

For you to get this to work, type npm return_tests and visit the ''src' directory and run npm start and go to the 4 files listed at the top!
