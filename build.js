
  /*
    @param {generate_functions: function}: if true, searches directories and writes to a file of all functions asked to test
  */

  var generate_functions = require('./generate_functions');

  /*
    @param {error_sets: array}: exported set of objects that did not pass test
    @param {index_set: object: []}: errors at index
  */

  var error_sets = [];
  var index_set = {};

  /*
    @param {tests: array}: array of objects to run tests
  */

  function start_tests(tests) {   
    return run_tests(tests);
  }

  /*
    @param {multiply_this_object}: takes the object index and multiplies it each time with random parameters
    @param {returned_set}: the array of objects under one index with random parameters
  */

  function multiply_function_set(randomized_object_configuration) {

    var returned_set = [];

    for(let i = 0; i < randomized_object_configuration.multiply_amount; i++) {
      returned_set.push(create_single_randomized_object(
        randomized_object_configuration 
      ));
    }

    return returned_set; 

  }

  /*
    @param {randomized_object_configuration} the randomized object at index
  */

  function create_single_randomized_object(randomized_object_configuration) { 

    var params = [];

    var if_random_or_not_in_selected = [
      create_random_inner_param_object(randomized_object_configuration.when_obj_passed),
      create_random_inner_param_array(randomized_object_configuration.when_arr_passed),
      create_random_inner_param_string(), 
      create_random_inner_param_number(),
      create_random_inner_param_boolean(), 
      undefined, 
      null
    ];

    for(let i = 0; i < randomized_object_configuration.parameters.length; i++) { 

      var current_parameter = randomized_object_configuration.parameters[i]; 

      if(current_parameter === 'string') { 
        params.push(create_random_inner_param_string());
      }

      else if(current_parameter === 'number') { 
        params.push(create_random_inner_param_number());
      }

      else if(current_parameter === 'object') { 
        params.push(create_random_inner_param_object(randomized_object_configuration.when_obj_passed));
      }

      else if(current_parameter === 'array') { 
        params.push(create_random_inner_param_array(randomized_object_configuration.when_arr_passed));
      }

      else if(current_parameter === 'undefined') { 
        params.push(undefined);
      }

      else if(current_parameter === 'boolean') { 
        params.push(create_random_inner_param_boolean());
      }

      else if(current_parameter === 'null') { 
        params.push(null);
      }

      else if(current_parameter === 'random') { 
        params.push(if_random_or_not_in_selected[Math.floor(Math.random() * if_random_or_not_in_selected.length)]);
      }

      else { 
        params.push(if_random_or_not_in_selected[Math.floor(Math.random() * if_random_or_not_in_selected.length)]);
      }

    }
    
    return params;

  }


  /*
    returns one of string, number, boolean, array or object
    @param {config_and_build: object / array}: the typed object/array passed for building
  */    

  function create_random_inner_param_string()  { 
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

  function create_random_inner_param_number()  { 
    return Math.floor(Math.random() * 100000);
  }

  function create_random_inner_param_boolean() { 
    return Boolean(Math.floor(Math.random() * 2));
  }  

  function create_random_inner_param_object(config_and_build)  {

    var o = {}

    for(let i = 0; i < config_and_build.length; i++) { 

      if(config_and_build[i] === 'boolean') { 
        o[`test-param-boolean-${i}`] = create_random_inner_param_boolean();
      }

      else if(config_and_build[i] === 'number') { 
        o[`test-param-number-${i}`] = create_random_inner_param_number();
      }

      else if(config_and_build[i] === 'string') { 
        o[`test-param-string-${i}`] = create_random_inner_param_string();
      }

      else if(config_and_build[i] === 'undefined') { 
        o[`test-param-undefined-${i}`] = undefined;
      }

      else if(config_and_build[i] === 'null') { 
        o[`test-param-null-${i}`] = null;
      }

      else { 
        o[`test-param-null-${i}`] = null;
      }

    }

    return o;

  } 

  function create_random_inner_param_array(config_and_build)   { 

    var a = [];

    for(let i = 0; i < config_and_build.length; i++) { 

      if(config_and_build[i] === 'boolean') { 
        a.push(create_random_inner_param_boolean());
      }

      else if(config_and_build[i] === 'number') { 
        a.push(create_random_inner_param_number());
      }

      else if(config_and_build[i] === 'string') { 
        a.push(create_random_inner_param_string());
      }

      else if(config_and_build[i] === 'undefined') { 
        a.push(undefined);
      }

      else if(config_and_build[i] === 'null') { 
        a.push(null);
      }

      else { 
        a.push(null);
      }

    }

    return a;

  }

  /*
    @param {tests: array}: the array of tests
  */
        
  function run_tests(tests) {

    for(let i = 0; i < tests.length; i++) { 

      if(
        typeof(tests[i]) !== 'object' || 
        typeof(tests[i].unit) !== 'object' || 
        typeof(tests[i].randomized) !== 'object' || 
        typeof(tests[i].index_of_set) !== 'number' ||
        typeof(tests[i].function_called) !== 'object'
      ) {
        throw new Error(`
          index: ${i} \n
          error: (unit: object), (index_of_set: number), (parameters: object), (function_called: object), (randomized: object) must be defined \n
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
        tests[i].randomized.on,
        tests[i].randomized.parameters,
        tests[i].randomized.when_obj_passed,
        tests[i].randomized.when_arr_passed,
        tests[i].randomized.multiply_amount,
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

      if(tests[i].randomized.on === true) { 
        tests[i].function_called.parameters = multiply_function_set(tests[i].randomized);
      }

      for(let j = 0; j < tests[i].function_called.parameters.length; j++) { 

        var error_count = 0;

        var return_value = tests[i].function_called.function(...tests[i].function_called.parameters[j]);

        var error_type = {};

        if(tests[i].unit.allowed_types.on === true) {

          if(
            tests[i].unit.allowed_types.index_exact === false && 
            tests[i].unit.allowed_types.values.includes(typeof(return_value)) !== true
          ) { 
            error_type.message = `The value returned is not within the allowed types.`;
            error_type.return_type =  typeof(return_value);
            error_type.return_value =  return_value;
            error_type.allowed_values = tests[i].unit.allowed_types.values;
            error_count++;
          }

          if(
            tests[i].unit.allowed_types.index_exact === true && 
            tests[i].unit.allowed_types.values[j] !== typeof(return_value)
          ) { 
            error_type.message = `The type returned is not equal to the allowed type.`;
            error_type.return_type =  typeof(return_value);
            error_type.return_value =  return_value;
            error_type.allowed_values = tests[i].unit.allowed_types.values[j];
            error_count++;
          }

        }

        var error_value = {};

        if(tests[i].unit.allowed_values.on === true) {

          if(return_value === null || typeof(return_value) !== 'object') {

            if(
              tests[i].unit.allowed_values.index_exact === false && 
              tests[i].unit.allowed_values.values.includes(return_value) !== true
            ) { 
              error_value.message = `The value returned is not within the allowed values. `;
              error_value.return_value = return_value;
              error_value.return_type =  typeof(return_value);
              error_value.allowed_values = tests[i].unit.allowed_values.values;
              error_count++;
            }

            if(
              tests[i].unit.allowed_values.index_exact === true && 
              tests[i].unit.allowed_values.values[j] !== return_value
            ) { 
              error_value.message = `The value returned is not equal to the allowed value. `;
              error_value.return_value = return_value;
              error_value.return_type =  typeof(return_value);
              error_value.allowed_values = tests[i].unit.allowed_values.values[j];
              error_count++;
            }

          } 
          
          if(typeof(return_value) === 'object') { 

            if(tests[i].unit.allowed_values.index_exact === false) {

              var match = false;

              for(let k = 0; j < tests[i].unit.allowed_values.values.length; k++) { 
                if(typeof(tests[i].unit.allowed_values.values[k]) === 'object') { 
                  if(JSON.stringify(tests[i].unit.allowed_values.values[k]) === JSON.stringify(return_value)) { 
                    match = true;
                    break;
                  }
                }
              }

              if(match === false) { 
                error_value.message = `The value returned is not within the allowed values.`;
                error_value.return_value = return_value;
                error_value.return_type =  typeof(return_value);
                error_value.allowed_values = tests[i].unit.allowed_values.values;
                error_count++;
              }

            }

            if(
              tests[i].unit.allowed_values.index_exact === true && 
              JSON.stringify(tests[i].unit.allowed_values.values[j]) !== JSON.stringify(return_value)
            ) { 
              error_value.message = `The value returned is not equal to the allowed values.`;
              error_value.return_value = return_value;
              error_value.return_type =  typeof(return_value);
              error_value.allowed_values = tests[i].unit.allowed_values.values[j];
              error_count++;
            }

          }

        }

        var error_rejex = [];

        if(tests[i].unit.regex_set.on === true) {

          if(tests[i].unit.regex_set.index_exact === false) {
            for(let k = 0; k < tests[i].unit.regex_set.values.length; k++) { 
              var test_regex = test(tests[i].unit.regex_set.values[k], return_value); 
              if(test_regex !== true) { 
                error_rejex.push({ 
                  message: `The value returned does not pass all regular expressions`, 
                  regular_expression:  tests[i].unit.regex_set.values[k], 
                  return_value: return_value, 
                  expressions_tested: tests[i].unit.regex_set.values
                });
              }
            }
          }

          if(tests[i].unit.regex_set.index_exact === true) { 
            var test_regex = test(tests[i].unit.regex_set.values[j], return_value); 
            if(test_regex !== true) { 
              error_rejex.push({ 
                message: `The value returned does not pass the one regular expression`, 
                regular_expression:  tests[i].unit.regex_set.values[j], 
                return_value: return_value, 
                expressions_tested: tests[i].unit.regex_set.values[j]
              });
            }
          }

        }

        if(error_rejex.length > 0) { 
          error_count++;
        }

        if(error_count > 0) { 
          var finalized_error_object = {};
          finalized_error_object.ev = error_value;
          finalized_error_object.et = error_type;
          finalized_error_object.er = error_rejex;
          finalized_error_object.pi = j;
          finalized_error_object.fi = i;
          finalized_error_object.info = tests[i];
          error_sets.push(finalized_error_object);
          typeof(index_set['function-'+i]) === 'undefined' ? 
          index_set['function-'+i] = [finalized_error_object] : 
          index_set['function-'+i].push(finalized_error_object);
        }

      }

    }

    return { 
      all_errors: error_sets,
      errors_at_index: index_set
    }
          
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
    @param {randomized_on: boolean}: whether to multiply the index of object function with random parametrs or not
    @param {randomized_parameters: array}: the parameter types listed in an array. accepted is undefined, null, object, array, number, string
    @param {randomized_when_obj_passed: array}: if an object is passed to randmized_parameters, an object gets built with random values athat param index
    @param {randomized_when_arr_passed: array}: if an array is passed to randmized_parameters, an array gets built with random values
    @param {randomized_multiply_amount: number}: amount of times to multiply object index
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
    randomized_on,
    randomized_parameters, 
    randomized_when_obj_passed,
    randomized_when_arr_passed, 
    randomized_multiply_amount
  ) { 

    var init_errors = '';
    
    if(typeof(allowed_types.on) !== 'boolean' || (typeof(allowed_types.values) !== 'object' || Array.isArray(allowed_types.values) === false) || typeof(allowed_types.index_exact) !== 'boolean') {
      init_errors += '(unit.allowed_types) must be an object with paramters (on: boolean) and (values: array) \n';
    }

    if(typeof(allowed_values.on) !== 'boolean' || (typeof(allowed_values.values) !== 'object' || Array.isArray(allowed_values.values) === false) || typeof(allowed_values.index_exact) !== 'boolean') {
      init_errors += '(unit.allowed_values) must be an object with parameters (on: boolean) and (values: array) \n';
    }

    if(typeof(regex_set.on) !== 'boolean' || (typeof(regex_set.values) !== 'object' || Array.isArray(regex_set.values) === false) || typeof(regex_set.index_exact) !== 'boolean') {
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

    if(typeof(randomized_on) !== 'boolean') {
      init_errors += '(randomized.randomized_on) must be a boolean \n';
    }

    if((typeof(randomized_parameters) !== 'object' || Array.isArray(randomized_parameters) === false)) {
      init_errors += '(randomized.randomized_parameters) must be an array \n';
    }

    if((typeof(randomized_when_obj_passed) !== 'object' || Array.isArray(randomized_when_obj_passed) === false)) {
      init_errors += '(randomized.randomized_when_obj_passed) must be an array \n';
    }

    if((typeof(randomized_when_arr_passed) !== 'object' || Array.isArray(randomized_when_arr_passed) === false)) {
      init_errors += '(randomized.randomized_when_arr_passed) must be an array \n';
    }

    if(typeof(randomized_multiply_amount) !== 'number' && typeof(randomized_multiply_amount) !== 'object') {
      init_errors += '(randomized.randomized_multiply_amount) must be a number or null \n';
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
    @param {regular_expression: string}: regular expression being tested
    @param {return_value: number, string, undefined, null, object, boolean}: the value being tested against
  */

  function test(regular_expression, return_value) { 
    try {
      return regular_expression.test(return_value);
    } catch(err) { 
      return false;
    } 
  }

  /*
    @run {function} the initial function
  */

  module.exports = { 
    run: start_tests, 
    generate: generate_functions 
  } 

