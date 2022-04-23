# return_tests

Tests if a functions return value matches a regular expression, data type and data value.

## How To Configure

Inside 'build.js', add files names to configure.all_functions_to_test. The file names come from the functions folder. Each file you add will be a function that you test.

```js
const configure = {
  all_functions_to_test: [
    "./functions/example1.js",
    "./functions/example2.js",
    "./functions/example3.js",
  ],
};
```

## Where your functions live

Go to the '/functions' folder and you will see some examples of how your functions are formatted. Create a new file in that folder with the same format as the examples. The function you place in function_called will be the one that is tested.

```js
    tests: [
      { unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, a: 2, b: 5, c: 77 },
      { unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 2, a: 2, b: 5, c: 77 },
      { unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 3, a: 'hello world', b: 5, c: 77 },
      { unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 4, a: 2, b: 5, c: 77 },
      { unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 5, a: 2, b: 5, c: 77 }
    ],

    allowed_types: {
      on: false,
      values: ['number', 'BigInt']
    },

    allowed_values: {
      on: false,
      values: [7, 12]
    },

    regex_set: {
      on: false,
      values: []
    },

    function_called:
       function (a, b) {
        try {
          return a + b;
        } catch(err) {
          return err;
        }
      },

    function_type: null,

    directory: null,

    function_name: null,

    time_created: null,

    still_exists: {
      still_exists: true,
      other_possible_directories: []
    },

    developers_assigned: [{
      name: null,
      email: null,
      phone: null
    }],

    end_point_hit: null,

    client_hit: null,

    description: 'this function...',

    index: 1
};
```

# Get started

Run 'npm i return_tests' in your application, then go to the '/src' folder and run npm start then go to localhost:3000 to see all the errors for each of the example functions listed in the build.js config object. Then you can add your own functions!
