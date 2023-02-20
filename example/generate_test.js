const generate = require("../lib/generate");

const folders = [
  { folder: "./tests", files: 'all' }, // "all" for all
];

const file_to_generate = './example/generated/generated_functions.js';

const unit = ['must_be_value'];

const function_types = { 
 regular: true, 
 arrow: true, 
 react_function_component: false, 
 react_class_component: false
}

try {
  console.log(generate(folders, file_to_generate, unit, function_types));
} catch (err) {
  console.log(err.message);
}