# return_tests

Tests if a functions return value matches a regular expression, data type and data value in the row of the set or in the object of the file.

## How To Configure

Inside 'build.js', add file names to the configure.all_functions_to_test array. The file names come from the '/functions' folder. Each added is a function or set of different functions tested dependent on config in the file.

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

Go to the '/functions' folder and see how the functions are formatted. Create a new file in that folder with the same format as the examples. The function placed in function_called will be the function that is tested in that file. If not that one, add one or more to the object with a shared index to test.

# Get started

Run 'npm i return_tests' in your application, then go to the '/src' folder and run npm start then go to localhost:3000 to see all the errors for each of the example functions listed in the build.js config object. Then you can add your own functions! FUNC YOU!
