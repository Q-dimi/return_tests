  var generate_functions = require('./lib/generate');
  var type = require('./tests/type');
  var value = require('./tests/value');
  var regex = require('./tests/regex');
  var greaterThan = require('./tests/greaterThan');
  var lessThan = require('./tests/lessThan');
  var inRange = require('./tests/inRange');
  var isEvenOrOdd = require('./tests/isEvenOrOdd');
  var hasRemainder = require('./tests/hasRemainder');
  var timeTrial = require('./tests/timeTrial');

  function start_tests(tests, optional_index_array) { 

    if(typeof(tests) !== 'object' || Array.isArray(tests) === false) { 
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

        var return_value;
        var time_taken = Date.now();
        var error_count = 0;
        var error_string = `\nERROR\nfunction index: ${i}/${typeof(tests[i].index) !== 'undefined' ? (typeof(tests[i].index) === 'object' ? '\nfunction index name: '+JSON.stringify(tests[i].index)+'/' : '\nfunction index name: '+tests[i].index)+'/' : ''}\nparameter index: ${j}/\n`;

        try {
          return_value = tests[i].function_called.function(...tests[i].function_called.parameters[j]);
        } catch(err) { 
          return_value = err.message;
        }

        time_taken = Date.now() - time_taken;

        var test_suite = { 
          value: typeof(tests[i].unit.allowed_values) === 'object' && tests[i].unit.allowed_values !== null ? value(tests[i], return_value, i, j) : 'PASSED',
          type: typeof(tests[i].unit.allowed_types) === 'object' && tests[i].unit.allowed_types !== null ? type(tests[i], return_value, i, j) : 'PASSED',
          regex: typeof(tests[i].unit.regex_set) === 'object' && tests[i].unit.regex_set !== null ? regex(tests[i], return_value, i, j) : 'PASSED',
          greaterThan: typeof(tests[i].unit.is_greater_than) === 'object' && tests[i].unit.is_greater_than !== null ? greaterThan(tests[i], return_value, i, j) : 'PASSED',
          lessThan: typeof(tests[i].unit.is_less_than) === 'object' && tests[i].unit.is_less_than !== null ? lessThan(tests[i], return_value, i, j) : 'PASSED',
          inRange: typeof(tests[i].unit.in_range) === 'object' && tests[i].unit.in_range !== null ? inRange(tests[i], return_value, i, j) : 'PASSED',
          isEvenOrOdd: typeof(tests[i].unit.is_even_or_odd) === 'object' && tests[i].unit.is_even_or_odd !== null ? isEvenOrOdd(tests[i], return_value, i, j) : 'PASSED',
          hasRemainder: typeof(tests[i].unit.has_remainder) === 'object' && tests[i].unit.has_remainder !== null ? hasRemainder(tests[i], return_value, i, j) : 'PASSED',
          timeTrial: typeof(tests[i].unit.time_trial) === 'object' && tests[i].unit.time_trial !== null ? timeTrial(tests[i], return_value, i, j, time_taken) : 'PASSED'
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

        if(test_suite.hasRemainder !== 'PASSED') { 
          error_string += test_suite.hasRemainder;
          error_count++;
        }

        if(test_suite.timeTrial !== 'PASSED') { 
          error_string += test_suite.timeTrial;
          error_count++;
        }

        if(error_count > 0) { 
          error_sets.push(error_string);
        }

      }

    }

    return error_sets;
          
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