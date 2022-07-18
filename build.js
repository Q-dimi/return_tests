var generate_functions = require('./lib/generate');
var format = require('./tests/helpers/stringFormatters');
var type = require('./tests/type');
var value = require('./tests/value');
var regex = require('./tests/regex');
var greaterThan = require('./tests/greaterThan');
var lessThan = require('./tests/lessThan');
var inRange = require('./tests/inRange');
var isEvenOrOdd = require('./tests/isEvenOrOdd');

/**
 * runs tests
 *
 * - iterates through functions
 * - iterates through parameter sets of function
 * - passes a parameter set to the function
 * - returns a value from that parameter set
 * - value is tested against any of the unit objects
 * 
 * @param {Array} tests The functions being tested
 * @param {Array} optional_index_array array containing indexes of functions to ONLY test. Tests all functions if not passed
*/

function start_tests(tests, optional_index_array) { 

 if(
  typeof(tests) !== 'object' || 
  Array.isArray(tests) === false
 ) { 
  throw new Error('the functions you are passing must be an array');
 }

 if(
  typeof(optional_index_array) === 'object' && 
  Array.isArray(optional_index_array) === true && 
  optional_index_array.length > 0
 ) { 

  var specific = [];

  for(let i = 0; i < tests.length; i++) { 
   if(
    typeof(tests[i]) === 'object' && 
    typeof(tests[i].index) !== 'undefined' && 
    optional_index_array.includes(tests[i].index)
   ) { 
    specific.push(tests[i]);
   }
  }

  return run_tests(specific);
  
 }

 return run_tests(tests);

}
      
function run_tests(tests) {

 var error_sets = [];

 for(let i = 0; i < tests.length; i++) { 

  if(
   typeof(tests[i]) !== 'object' || 
   typeof(tests[i].unit) !== 'object' || 
   typeof(tests[i].function_called) !== 'object'
  ) {
   throw new Error(`
    function index: ${i} \n
    error: function index, (unit: object) and 
    (function_called: object)
    must be defined
   `);
  }

  var check_inside_errors = main_or_fallback_errors(
   tests[i].function_called.function, 
   tests[i].function_called.description, 
   tests[i].function_called.on, 
   tests[i].function_called.parameters,
  ); 

  if(check_inside_errors.error === true) { 
   throw new Error(`
    function index: ${i} \n 
    ${check_inside_errors.error_string}
   `);
  };

  if(tests[i].function_called.on !== true) { 
   continue;
  }

  for(let j = 0; j < tests[i].function_called.parameters.length; j++) { 

   if(
    typeof(tests[i].function_called.parameters[j]) !== 'object' || 
    Array.isArray(tests[i].function_called.parameters[j]) === false
   ) { 
    throw new Error(`
     function index: ${i} \n 
     parameter index: ${i} \n 
     error: the parameters passed must be an array
    `);
   }

   var return_value;
   var time_taken = Date.now();
   var error_count = 0;

   var error_string = format({ 
    id: 'startString',
    function_index: i, 
    function_index_name: 
    typeof(tests[i].index) !== 'undefined' ? 
    typeof(tests[i].index) === 'object' ? 
    JSON.stringify(tests[i].index) : 
    tests[i].index : 
    '', 
    parameter_index: j
   });

   try {
    return_value = tests[i].function_called.function(...tests[i].function_called.parameters[j]);
   } catch(err) { 
    return_value = err.message;
   }

   var test_suite = { 
    value: typeof(tests[i].unit.allowed_values) === 'object' && tests[i].unit.allowed_values !== null ? value(tests[i], return_value, i, j) : 'PASSED',
    type: typeof(tests[i].unit.allowed_types) === 'object' && tests[i].unit.allowed_types !== null ? type(tests[i], return_value, i, j) : 'PASSED',
    regex: typeof(tests[i].unit.regex_set) === 'object' && tests[i].unit.regex_set !== null ? regex(tests[i], return_value, i, j) : 'PASSED',
    greaterThan: typeof(tests[i].unit.is_greater_than) === 'object' && tests[i].unit.is_greater_than !== null ? greaterThan(tests[i], return_value, i, j) : 'PASSED',
    lessThan: typeof(tests[i].unit.is_less_than) === 'object' && tests[i].unit.is_less_than !== null ? lessThan(tests[i], return_value, i, j) : 'PASSED',
    inRange: typeof(tests[i].unit.in_range) === 'object' && tests[i].unit.in_range !== null ? inRange(tests[i], return_value, i, j) : 'PASSED',
    isEvenOrOdd: typeof(tests[i].unit.is_even_or_odd) === 'object' && tests[i].unit.is_even_or_odd !== null ? isEvenOrOdd(tests[i], return_value, i, j) : 'PASSED',
   }

   error_string += `function and test execution time: ${Date.now() - time_taken}ms\n`;
   error_string += `function description: ${tests[i].function_called.description}\n`;

   if(test_suite.value !== 'PASSED') { 
    error_string += test_suite.value;
    error_count++;
   }

   if(test_suite.type !== 'PASSED') { 
    error_string += test_suite.type;
    error_count++;
   }

   if(test_suite.regex !== 'PASSED') { 
    error_string += test_suite.regex;
    error_count++;
   }

   if(test_suite.greaterThan !== 'PASSED') { 
    error_string += test_suite.greaterThan;
    error_count++;
   }

   if(test_suite.lessThan !== 'PASSED') { 
    error_string += test_suite.lessThan;
    error_count++;
   }

   if(test_suite.inRange !== 'PASSED') { 
    error_string += test_suite.inRange;
    error_count++;
   }

   if(test_suite.isEvenOrOdd !== 'PASSED') { 
    error_string += test_suite.isEvenOrOdd;
    error_count++;
   }

   if(error_count > 0) { 
    error_sets.push(error_string);
   }

  }

 }

 return error_sets;
        
}

/**
 * checks if function is set correctly
 * 
 * @param {function} function_ The function being tested
 * @param {String} function_description The description of the function like filepath, name...ect
 * @param {Boolean} function_on whether to run the function or not
 * @param {Array} function_parameters the set of parameter sets being passed to the function [[1,2],[5,6]]
*/

function main_or_fallback_errors(
 function_, 
 function_description, 
 function_on, 
 function_parameters,
) { 

 var init_errors = '';

 if(typeof(function_) !== 'function') {
  init_errors += '(function_called.function) must be a function \n';
 }

 if(typeof(function_description) !== 'object' && typeof(function_description) !== 'string') {
  init_errors += '(function_called.description) must be null or a string \n';
 }

 if(typeof(function_on) !== 'boolean') {
  init_errors += '(function_called.on) must be a boolean \n';
 }

 if(typeof(function_parameters) !== 'object' || Array.isArray(function_parameters) === false) { 
  init_errors += '(function_called.parameters) must be an array \n';
 }

 if(init_errors.trim().length > 0) { 
  return { 
   error: true, 
   error_string: init_errors
  }
 }

 return { 
  error: false, 
  error_string: init_errors
 }

}

module.exports = { 
 run: start_tests, 
 generate: generate_functions 
} 