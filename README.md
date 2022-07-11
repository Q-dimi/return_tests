# return_tests (BEING FIXED)

return-tests tests if a functions return value matches a regular expression, data type and data value.

---js

{
randomized: {
on: true,
parameters: ['number', 'string', 'BigInt', 'object', 'array', 'boolean', 'undefined', 'null', 'random'],
when_obj_passed: ['number', 'string', 'BigInt', 'undefined', 'null', 'boolean'],
when_arr_passed: ['number', 'string', 'BigInt', 'undefined', 'null', 'boolean'],
multiply_amount: 5
},
function_called: {
on: true,
name: 'your function name',
filepath: 'directory where function lives',
description: 'function description',
param_names: 'parameter names in case random parameters are passed in',
parameters: ['a', 'b'],
function: function(a, b) {
try {
return a + b;
} catch (err) {
return err;
}
}
},
unit: {
allowed_types: {
on: true,
values: ['number', 'BigInt', 'string', 'undefined', 'boolean', 'object']
},
allowed_values: {
on: true,
values: [7, 12, 'hello world', {name: 'alex'}, false, undefined, null, [1, 2, 3]]
},
regex_set: {
on: false,
values: [/[^a-z]+/, /[^a-z]+/]
},
},
index_of_set: 1,
}

---js
