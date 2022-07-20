var return_tests = require('../index'); //'return-tests'
var functions = require('./functions'); //functions testing

//only test math functions
var index_set_A = ['math'];
//only test business functions
var index_set_B = ['business'];
//only test to do functions
var index_set_C = ['todo'];
//only test math and business functions
var index_set_D = ['math', 'business'];

var errors = [];

try { 
  errors = return_tests.run(functions);
} catch(err) { 
  console.log(err.message)
}

for(let i = 0; i < errors.length; i++) { 
  console.log(errors[i]);
}