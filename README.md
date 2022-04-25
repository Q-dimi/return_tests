# return_tests

Tests if a functions return value matches a regular expression, data type and data value in the row of the set. https://www.npmjs.com/package/return_tests

## How To Configure

Inside 'build.js', add file names to the configure.all_files_to_test array. The file names come from the '/functions' folder. Each added file is a representation of a set of functions that need testing.

```js
const configure = {
  all_files_to_test: ["./functions/example1.js", "./functions/example2.js"],
};
```

## Where your functions live

Go to the '/functions' folder and see how the functions are formatted. Create a new file in that folder with the same format as the examples. The file you create is a supposed to represent all the functions in a directory in your application. Below are the parameters and the types allowed for each with a description.

- [ ] tests: array = the array of objects that cotains the function and tests for that function

- [ ] randomized.on = boolean: whether to multiply the object with random parameters

- [ ] randomized.parameters = array: the type of parameters passed randomly

- [ ] randomized.when_obj_passed: array = param types and length of object if passed (manual for deep objects)

- [ ] randomized.when_arr_passed: object = param types and length of array if passed (manual for deep arrays)

- [ ] randomized.multiply_amount: integer = the amount of times to multiply

- [ ] function_called: object = the object that contains the functions configuration

- [ ] function_called.on: boolean = whether to skip this row or execute this row

- [ ] function_called.function_name: string = the name of the function executed

- [ ] function_called.function_directory: string = the directory in your application where the function is

- [ ] function_called.function_description: string = the decription of the function

- [ ] function_called.base_param_names: string = the param names passed to the function

- [ ] function_called.function: function = the function to be called in execution

- [ ] unit: object: = the object that contains the three tests

- [ ] unit.allowed_types: object: = the allowed types the function must return

- [ ] unit.allowed_types.on: boolean: = whether to run allowed types test on the function

- [ ] unit.allowed_types.values: array: = the actual types being checked

- [ ] unit.allowed_values: object: = the allowed values your return value must match

- [ ] unit.allowed_values.on: boolean = whether to run allowed values check in execution

- [ ] unit.allowed_values.values: array = the values that must match the returned value from the function

- [ ] unit.regex_set: object = the regular expressions tested against

- [ ] unit.regex_set.on: boolean = whether to run the regular expressions check in execution

- [ ] unit.regex_set.values: array = the regular expressions the return value gets checked against

- [ ] index_of_set: integer = the index of the test. (when you multiply this becomes a shared index)

- [ ] parameters: object = the parameters passed into the function

# Get started

Run 'npm i return_tests' in your application, then go to the '/src' folder and run npm start then go to localhost:3000 to see all the errors for each of the example functions listed in the build.js config object. Then you can add your own functions!
