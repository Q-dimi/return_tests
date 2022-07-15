  var generate_functions = require('./lib/generate');
  var type = require('./tests/type');
  var value = require('./tests/value');
  var regex = require('./tests/regex');

  /*
    @param {error_sets: array}: exported set of objects that did not pass test
  */

  var error_sets = [];

  /*
    @param {tests: array}: array of objects to run tests
  */

  function start_tests(tests) {   
    return run_tests(tests);
  }

  /*
    @param {tests: array}: the array of tests
  */
        
  function run_tests(tests) {

    for(let i = 0; i < tests.length; i++) { 

      if(
        typeof(tests[i]) !== 'object' || 
        typeof(tests[i].unit) !== 'object' || 
        typeof(tests[i].function_called) !== 'object'
      ) {
        throw new Error(`
          index: ${i} \n
          error: (unit: object), (parameters: object), 
          (function_called: object), 
           must be defined
        `);
      }

      var check_inside_errors = main_or_fallback_errors(
        tests[i].unit.allowed_types,
        tests[i].unit.allowed_values, 
        tests[i].unit.regex_set, 
        tests[i].function_called.function, 
        tests[i].function_called.name, 
        tests[i].function_called.filepath, 
        tests[i].function_called.description, 
        tests[i].function_called.param_names,
        tests[i].function_called.on, 
        tests[i].function_called.parameters,
      ); 

      if(check_inside_errors.error === true) { 
        throw new Error(`
          index: ${i} \n 
          ${check_inside_errors.error_string}
        `);
      };

      if(tests[i].function_called.on !== true) { 
        continue;
      }

      for(let j = 0; j < tests[i].function_called.parameters.length; j++) { 

        var error_count = 0;

        var error_string = `\nfunction index: ${i}/\nparameter index: ${j}/\n`;

        var return_value = tests[i].function_called.function(...tests[i].function_called.parameters[j]);

        var test_suite = { 
          value: value(tests[i], return_value, j),
          type: type(tests[i], return_value, j), 
          regex: regex(tests[i], return_value, j)
        }

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

        if(error_count > 0) { 
          error_sets.push(error_string);
        }

      }

    }

    return error_sets
          
  }

  /*
    @param {allowed_types: object}: allowed return types
    @param {allowed_values: object}: allowed return values
    @param {regex_set: object}: allowed regular expressions
    @param {function_: function}: function being tested
    @param {function_name: string}: name of the function
    @param {function_directory: string}: directory of the function
    @param {function_description: string}: description of the function
    @param {function_param_names: string}: parameter names of the function (not passed in)
    @param {function_on: boolean}: whether to skip this function or test it
    @param {function_paramters: array}: the original values of the parameters passed to the function
  */

  function main_or_fallback_errors(
    allowed_types, 
    allowed_values, 
    regex_set, 
    function_, 
    function_name, 
    function_directory, 
    function_description, 
    function_param_names, 
    function_on, 
    function_parameters,
  ) { 

    var init_errors = '';
    
    if(
      typeof(allowed_types) !== 'object' || 
      typeof(allowed_types.on) !== 'boolean' || 
      (typeof(allowed_types.values) !== 'object' || Array.isArray(allowed_types.values) === false) || 
      typeof(allowed_types.index_exact) !== 'boolean'
    ) {
      init_errors += '(unit.allowed_types) must be an object with paramters (on: boolean) and (values: array) \n';
    }

    if(
      typeof(allowed_values) !== 'object' || 
      typeof(allowed_values.on) !== 'boolean' || 
      (typeof(allowed_values.values) !== 'object' || Array.isArray(allowed_values.values) === false) || 
      typeof(allowed_values.index_exact) !== 'boolean'
    ) {
      init_errors += '(unit.allowed_values) must be an object with parameters (on: boolean) and (values: array) \n';
    }

    if(
      typeof(regex_set) !== 'object' || 
      typeof(regex_set.on) !== 'boolean' || 
      (typeof(regex_set.values) !== 'object' || Array.isArray(regex_set.values) === false) || 
      typeof(regex_set.index_exact) !== 'boolean'
    ) {
      init_errors += '(unit.regex_set) must be an object with parameters (on: boolean) and (values: array) \n';
    }

    if(typeof(function_) !== 'function') {
      init_errors += '(function_called.function) must be a function \n';
    }

    if(typeof(function_name) !== 'object' && typeof(function_name) !== 'string') {
      init_errors += '(function_called.function_name) must be null or a string \n';
    }

    if(typeof(function_directory) !== 'object' && typeof(function_directory) !== 'string') {
      init_errors += '(function_called.function_directory) must be null or a string \n';
    }

    if(typeof(function_description) !== 'object' && typeof(function_description) !== 'string') {
      init_errors += '(function_called.function_description) must be null or a string \n';
    }

    if(typeof(function_param_names) !== 'object' && typeof(function_param_names) !== 'string') {
      init_errors += '(function_called.base_param_names) must be null or a string \n';
    }

    if(typeof(function_on) !== 'boolean') {
      init_errors += '(function_called.function_on) must be a boolean \n';
    }

    if(typeof(function_parameters) !== 'object' || Array.isArray(function_parameters) === false) { 
      init_errors += '(function_called.function_parameters) must be an array \n';
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

  /*
    @run {function} the initial function
  */

  module.exports = { 
    run: start_tests, 
    generate: generate_functions 
  } 