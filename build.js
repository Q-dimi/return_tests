  var generate_functions = require('./lib/generate');
  var type = require('./tests/type');
  var value = require('./tests/value');
  var regex = require('./tests/regex');

  var error_sets = [];

  function start_tests(tests) {   
    return run_tests(tests);
  }
        
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
        tests[i].function_called.function, 
        tests[i].function_called.description, 
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
          value: typeof(tests[i].unit.allowed_values) === 'object' && tests[i].unit.allowed_values !== null ? value(tests[i], return_value, i, j) : 'PASSED',
          type: typeof(tests[i].unit.allowed_types) === 'object' && tests[i].unit.allowed_types !== null ? type(tests[i], return_value, i, j) : 'PASSED',
          regex: typeof(tests[i].unit.regex_set) === 'object' && tests[i].unit.regex_set !== null ? regex(tests[i], return_value, i, j) : 'PASSED'
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