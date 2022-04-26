# return_tests

Need to check the return values of functions across your files? Try return_tests. It is fast, simple, easy to use and even has a UI for you so you don't have to write any code to view your errors.
return_tests tests if a functions return value matches a regular expression, data type and data value.

```js
const errors = require("return_tests");
```

## How To Configure

Inside 'build.js', add file names to the configure.all_files_to_test array. The file names come from the '/functions' folder. Each added file is a representation of a set of functions that need testing.

```js
const configure = {
  all_files_to_test: ["./functions/example1.js", "./functions/example2.js"],
};
```

## Where your functions live

Go to the '/functions' folder and see how the functions are formatted. Create a new file in that folder with the same format as the examples. The file you create is a supposed to represent all the functions in a directory in your application. Below are the parameters and the types allowed for each with a description. base_file.js can be used as a template for each file created in the functions folder.

- [ ] tests: array = the array of objects that contains the functions and tests for those functions

- [ ] randomized.on boolean: = whether to multiply the object (create new objects with random params)

- [ ] randomized.parameters array: = parameters passed where each index represents parameter location and type.

- [ ] randomized.when_obj_passed: array = if object passed in randomized.parameters, the params of object

- [ ] randomized.when_arr_passed: object = if array passed in randomized.parameters, the params of array

- [ ] randomized.multiply_amount: integer = How many times to multiply row (create new objects with random params)

- [ ] function_called: object = the object that contains the functions configuration

- [ ] function_called.on: boolean = whether to skip this row or execute the rows function

- [ ] function_called.function_name: string = the name of the function executed

- [ ] function_called.function_directory: string = the directory in your application where the function is

- [ ] function_called.function_description: string = the decription of the function

- [ ] function_called.base_param_names: string = the param names passed to the function

- [ ] function_called.function: function = the function to be executed

- [ ] unit: object: = the object that contains the three tests

- [ ] unit.allowed_types: object: = the allowed types the function must return

- [ ] unit.allowed_types.on: boolean: = whether to run the allowed types test on the function

- [ ] unit.allowed_types.values: array: = the types being checked against the functions return value

- [ ] unit.allowed_values: object: = the allowed vales the function must return

- [ ] unit.allowed_values.on: boolean: = whether to run the allowed values test on the function

- [ ] unit.allowed_values.values: array: = the values that are compared against the return value of the function

- [ ] unit.regex_set: object: = the regular expressions tested against

- [ ] unit.regex_set.on: boolean: = whether to run the regular expressions check in execution

- [ ] unit.regex_set.values: array: = the regular expressions the return value gets checked against

- [ ] index_of_set: integer: = the index of the test. (when you multiply this becomes a shared index)

- [ ] parameters: object: = the parameters passed into the function whether random or your own

# How it works

An array of objects where each index represents a function to test. Every iteration, if function_called.on is true, will retrieve a return value from function_called.function and compare that value with the values in unit.allowed_values, unit.allowed_types and unit.regex_set.

# Get started

Run 'npm i return_tests' in your application, then go to the '/src' folder and run npm start then go to localhost:3000 to see all the errors for each of the example functions listed in the build.js config object. Then you can add your own functions! For your funtion to execute within the row, make sure function_called.on is set equal to true. For your function to multiply with random parameters, make sure function_called.on is true AND randomized.on is true.
