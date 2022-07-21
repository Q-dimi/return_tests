var suite = require('./suite');
var format = require('./tests/helpers/stringFormatters');

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

  var check_inside_errors = inside_errors(
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
  }

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

   const test_suite = suite(tests[i], return_value, i, j);

   error_string += format({ 
    id: 'executionTime',
    ms: Date.now() - time_taken
   });

   error_string += format({ 
    id: 'functionDescription',
    description: tests[i].function_called.description
   });

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

   if(test_suite.isDivisibleBy !== 'PASSED') { 
    error_string += test_suite.isDivisibleBy;
    error_count++;
   }

   if(test_suite.isOfLength !== 'PASSED') { 
    error_string += test_suite.isOfLength ;
    error_count++;
   }

   if(test_suite.lengthGreaterThan !== 'PASSED') { 
    error_string += test_suite.lengthGreaterThan;
    error_count++;
   }

   if(test_suite.lengthLessThan !== 'PASSED') { 
    error_string += test_suite.lengthLessThan;
    error_count++;
   }

   if(test_suite.primeOrNot !== 'PASSED') { 
    error_string += test_suite.primeOrNot;
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
 * checks if function index function_called is set correctly
 * 
 * @param {function} function_ The function being tested
 * @param {String} function_description The description of the function like filepath, name...ect
 * @param {Boolean} function_on whether to run the function or not
 * @param {Array} function_parameters the set of parameter sets being passed to the function [[1,2],[5,6]]
*/

function inside_errors(
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

module.exports = start_tests 
