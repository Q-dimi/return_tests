var return_tests = require('../build'); //'return_tests'
var functions = require('./functions'); //functions testing

var errors = [];

try { 
  errors = return_tests.run(functions);
} catch(err) { 
  console.log(err.message)
}

for(let i = 0; i < errors.length; i++) { 
  console.log(errors[i]);
}