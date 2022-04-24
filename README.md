# return_tests

Tests if a functions return value matches a regular expression, data type and data value in the row of the set or in the object of the file.

## How To Configure

Inside 'build.js', add file names to the configure.all_functions_to_test array. The file names come from the '/functions' folder. Each added file is the representation of a set of functions that need testing.

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

Go to the '/functions' folder and see how the functions are formatted. Create a new file in that folder with the same format as the examples. The file you create is a supposed to represent all the functions in a directory in your application. Below are the parameters and the types allowed for each.

- [ ] tests: array
- [ ] function_called: object
- [ ] function_called.on: boolean
- [ ] function_called.function_name: string
- [ ] function_called.function_directory: string
- [ ] function_called.function_description: string
- [ ] function_called.base_param_names: string
- [ ] function_called.function: function
- [ ] unit: object
- [ ] unit.allowed_types: object
- [ ] unit.allowed_types.on: boolean
- [ ] unit.allowed_types.values: array
- [ ] unit.allowed_values: object
- [ ] unit.allowed_values.on: boolean
- [ ] unit.allowed_values.values: array
- [ ] unit.regex_set: object
- [ ] unit.regex_set.on: boolean
- [ ] unit.regex_set.values: array
- [ ] index_of_set: integer
- [ ] parameters: object
- [ ] function_set_multiplied: array
- [ ] function_set_multiplied.randomized.parameters: array
- [ ] function_set_multiplied.randomized.when_obj_passed: object
- [ ] function_set_multiplied.randomized.when_arr_passed: object
- [ ] function_set_multiplied.randomized.multiply_amount: integer

# Get started

Run 'npm i return_tests' in your application, then go to the '/src' folder and run npm start then go to localhost:3000 to see all the errors for each of the example functions listed in the build.js config object. Then you can add your own functions!
