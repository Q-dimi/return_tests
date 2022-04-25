
/*
  @param {all_files_to_test: array}: Functions stored in each folder.
*/

const configure = { 

    all_files_to_test: [
      './functions/example1.js',
    ],

  }

  /*
    @param {developer_input: object}: imported data
    @param {tests: array}: array of objects to run tests
    @param {allowed_types: object}: allowed return types
    @param {allowed_values: object}: allowed return values
    @param {regex_set: object}: allowed regular expressions
    @param {function_called: function}: function passed 
    @param {error_sets: array}: exported set of objects that did not pass test
  */

  var error_sets = [];
          
  for(let i = 0; i < configure.all_files_to_test.length; i++) {

    try {

      var developer_input = require(configure.all_files_to_test[i]); 

      // if(developer_input.randomized.on === true) { 
      //   developer_input.tests = multiply_function_set(
      //     developer_input.tests,
      //     configure.all_files_to_test[i]
      //   );
      // }

      run_tests(
        developer_input.tests, 
        configure.all_files_to_test[i],
      );

    } catch(err) {

      console.log(err.message);

    }

  }

  /*
    multiply on multiply_amount
  */

  function multiply_function_set(multiply_function_set, original_tests, folder) { 

    var new_tests_array = [];

    try { 

      for(let i = 0; i < multiply_function_set.length; i++) { 
        new_tests_array = new_tests_array.concat(arrays_returned(multiply_function_set[i]));
      }

      return new_tests_array;

    } catch(err) { 

      console.log(`
        error: multplying did not work on index ${i} - 
        please see function_set_multiplied in folder: ${folder}`
      );

      return original_tests;

    }

  }

  /*
    The array of objects returned 
  */

  function arrays_returned(multiply_and_returned_set) {

    var returned_set = [];

    for(let i = 0; i < multiply_and_returned_set.randomized.parameters.multiply_amount; i++) { 
      returned_set.push(create_single_randomized_object(
        multiply_and_returned_set,
        multiply_and_returned_set.randomized.parameters,
      ));
    }

    return returned_set;

  }

  /*
    creates and returns a single randomized object
  */


  function create_single_randomized_object(attach_here, allowed_random_parameters) { 

    var params = {};

    var if_random_or_not_in_selected = [
      create_random_inner_param_string(), create_random_inner_param_number(),
      create_random_inner_param_BigInt(), create_random_inner_param_object(attach_here.randomized.when_obj_passed),
      create_random_inner_param_array(attach_here.randomized.when_arr_passed), undefined, 
      create_random_inner_param_boolean()
    ];

    for(let i = 0; i < allowed_random_parameters.length; i++) { 

      var current_parameter = allowed_random_parameters[i]; 

      if(current_parameter === 'string') { 
        params[`test-param-string-${i}`] = create_random_inner_param_string();
      }

      else if(current_parameter === 'number') { 
        params[`test-param-number-${i}`] = create_random_inner_param_number();
      }

      else if(current_parameter === 'BigInt') { 
        params[`test-param-BigInt-${i}`] = create_random_inner_param_BigInt();
      }

      else if(current_parameter === 'object') { 
        params[`test-param-object-${i}`] = create_random_inner_param_object(attach_here.randomized.when_obj_passed); // (string, number, both) - p count
      }

      else if(current_parameter === 'array') { 
        params[`test-param-array-${i}`] = create_random_inner_param_array(attach_here.randomized.when_arr_passed); //(string, number, both) - p count
      }

      else if(current_parameter === 'undefined') { 
        params[`test-param-undefined-${i}`] = undefined;
      }

      else if(current_parameter === 'boolean') { 
        params[`test-param-boolean-${i}`] = create_random_inner_param_boolean();
      }

      else if(current_parameter === 'random') { 
        params[`test-param-random-${i}`] = if_random_or_not_in_selected[Math.floor(Math.random() * if_random_or_not_in_selected.length)];
      }

      else { 

        console.log(
          `error: please pass in a string, number,
           BigInt, object, array, undefined, or boolean. 
           defaulting to random.`
        );

        params[`test-param-random-${i}`] = if_random_or_not_in_selected[Math.floor(Math.random() * if_random_or_not_in_selected.length)];

      }

    }

    attach_here.parameters = params;

    return attach_here;

  }

  function create_random_inner_param_string()  { 
    return Math.random().toString(50).replace(/[^a-z]+/g, '');
  }

  function create_random_inner_param_number()  { 
    return Math.floor(Math.random() * 100000);
  }

  function create_random_inner_param_BigInt()  { 
    return Math.floor(Math.random() * 999999999999999999999);
  }

  function create_random_inner_param_object(config_and_build)  {

    var o = {}

    for(let i = 0; i < config_and_build.length; i++) { 

      if(config_and_build[i] === 'boolean') { 
        o[`test-param-boolean-${i}`] = create_random_inner_param_string();
      }

      if(config_and_build[i] === 'number') { 
        o[`test-param-number-${i}`] = create_random_inner_param_number();
      }

      if(config_and_build[i] === 'string') { 
        o[`test-param-string-${i}`] = create_random_inner_param_string();
      }

      if(config_and_build[i] === 'undefined') { 
        o[`test-param-undefined-${i}`] = undefined;
      }

      if(config_and_build[i] === 'BigInt') { 
        o[`test-param-BigInt-${i}`] = create_random_inner_param_BigInt();
      }

    }

    return o;

  }

  function create_random_inner_param_array(config_and_build)   { 

    var a = [];

    for(let i = 0; i < config_and_build.length; i++) { 

      if(config_and_build[i] === 'boolean') { 
        a.push(create_random_inner_param_string());
      }

      if(config_and_build[i] === 'number') { 
        a.push(create_random_inner_param_number());
      }

      if(config_and_build[i] === 'string') { 
        a.push(create_random_inner_param_string());
      }

      if(config_and_build[i] === 'undefined') { 
        a.push(undefined);
      }

      if(config_and_build[i] === 'BigInt') { 
        a.push(create_random_inner_param_BigInt());
      }

    }

    return a;

  }

  function create_random_inner_param_boolean() { 
    return Boolean(Math.floor(Math.random() * 2));
  }

  /*
    check tests...
  */
          
  function run_tests(tests, file_name) {
  
    for(let i = 0; i < tests.length; i++) { 

      if(
        (typeof(tests[i]) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].index_of_set) !== 'number') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].parameters) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].function_called) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) === 'object' && typeof(tests[i].unit.allowed_types) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) === 'object' && typeof(tests[i].unit.allowed_values) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) === 'object' && typeof(tests[i].unit.regex_set) !== 'object') 
      ) {
  
        console.log(`
          (tests[i]) needs to be defined as an object with object
          (unit: object), (index_of_set: index), (parameters: object), (function_called: object)
          with allowed_values, allowed_types and regex set OBJECTS inside of the unit object...
          each object must be with the apporopriate values in the README (last level definition for undefined to pass)
        `);

        continue;
  
      }

      try {

        if(!main_or_fallback_errors(
          tests[i].unit.allowed_types,
          tests[i].unit.allowed_values, 
          tests[i].unit.regex_set, 
          tests[i].function_called.function, 
          file_name, tests[i].function_called.function_name, 
          tests[i].function_called.function_directory, 
          tests[i].function_called.function_description, 
          tests[i].function_called.base_param_names,
          tests[i].function_called.on
        )) { 

          console.log(`
            error: index ${i} on main check ${file_name}
          `);

          continue;

        };

      } catch(err) { 

          console.log(`
            error: could not errors
            ${err.message} - ${i} - ${file_name} - ${tests[i].index_of_set}
          `);

          continue;

      }

      if(tests[i].function_called.on !== true) { 
        continue;
      }
  
      var params = [];
  
      for (const [key, value] of Object.entries(tests[i].parameters)) {
        params.push(value);
      }
  
      var return_value;

      try{
        return_value = tests[i].function_called.function(...params);
      } catch(err)  {
        return_value = `error processing this function: ${err.message}`;
      }

      var error_count = 0;

      var error_type = {};
  
      if(tests[i].unit.allowed_types.on === true) {
  
        if(tests[i].unit.allowed_types.values.includes(typeof(return_value)) !== true) {
    
          error_type.message = `The value returned is not within the allowed types.`;
  
          error_type.return_type =  typeof(return_value);

          error_type.return_value =  return_value;
  
          error_count++;
  
        }
  
      }

      var error_value = {}; 
  
      if(tests[i].unit.allowed_values.on === true) {
  
        if(
          typeof(return_value) === 'number' || 
          typeof(return_value) === 'BigInt' || 
          typeof(return_value) === 'string' ||  
          typeof(return_value) === 'undefined' ||  
          typeof(return_value) === 'boolean'
        ) {
  
          if(tests[i].unit.allowed_values.values.includes(return_value) !== true) {  
    
            error_value.message = `The value returned is not within the allowed values.`;
  
            error_value.return_value = return_value;
  
            error_value.return_type =  typeof(return_value);;
  
            error_count++;
  
          }
  
         } else if(typeof(return_value) === 'object') { 
  
           var match = false;
  
           for(let i = 0; i < tests[i].unit.allowed_values.values.length; i++) { 
             if(typeof(tests[i].unit.allowed_values.values[i]) === 'object') { 
              if(JSON.stringify(tests[i].unit.allowed_values.values[i]).toLowerCase().trim() === JSON.stringify(return_value).toLowerCase().trim()) { 
                match = true;
                break;
              }
             }
           }
  
           if(match === false) { 
    
            error_value.message = `The value returned is not within the allowed values.`;
  
            error_value.return_value = return_value;
  
            error_value.return_type =  typeof(return_value);;
  
            error_count++;
  
           }
  
         } else { 
  
           console.log(`
            error: the only allowed types are number, BigInt, string, boolean, undefined and object
           `);
  
         }
  
      }

      var error_rejex = {};
    
      if(tests[i].unit.regex_set.on === true) {
  
        for(let i = 0; i < tests[i].unit.regex_set.values.length; i++) {  
  
          var test_regex = test(tests[i].unit.regex_set.values[i], return_value); 
  
          if(test_regex !== true) { 
  
            error_rejex[`message-${i}`] = `The value returned does not pass`;
  
            error_rejex[`regular_expression-${i}`] = tests[i].unit.regex_set.values[i];
  
            error_rejex[`return_value-${i}`] = return_value;
    
            error_count++;
  
          }
  
        }
  
      }
  
      if(error_count > 0) { 

        var finalized_error_object = {};
        var additional_info = {};

        additional_info.function_name = tests[i].function_called.function_name;
        additional_info.function_directory = tests[i].function_called.function_directory;
        additional_info.function_description = tests[i].function_called.function_description;
        additional_info.base_param_names = tests[i].function_called.base_param_names;
        additional_info.allowed_values = tests[i].unit.allowed_values.values;
        additional_info.allowed_types = tests[i].unit.allowed_types.values;
        additional_info.regex_set = tests[i].unit.regex_set.values;
        additional_info.function_called = tests[i].function_called.function;
        additional_info.file_name = file_name;
        additional_info.parameters = tests[i].parameters;
        additional_info.index_of_set = tests[i].index_of_set;

        finalized_error_object.error_value = error_value;
        finalized_error_object.error_type = error_type;
        finalized_error_object.error_rejex = error_rejex;
        finalized_error_object.additional_info = additional_info;

        error_sets.push(finalized_error_object);

      }
  
    }
         
  }

  /*
    Testing the input of main and fallback errors (running errors twice on tests in some cases)
  */

  function main_or_fallback_errors(
    allowed_types, allowed_values, regex_set, 
    function_called, file_name, function_name, function_directory, 
    function_description, base_param_names, on
  ) { 

    var init_errors = {};
    
    if(
      (typeof(allowed_types) !== 'object') || 
      (typeof(allowed_types) === 'object' && typeof(allowed_types.on) !== 'boolean') || 
      (typeof(allowed_types) === 'object' && (typeof(allowed_types.values) !== 'object' || Array.isArray(allowed_types.values) === false))) {
      init_errors.allowed_types = '(allowed_types) must be an object with paramters (on: boolean) and (values: array)';
    }

    if(
      (typeof(allowed_values) !== 'object') || 
      (typeof(allowed_values) === 'object' && typeof(allowed_values.on) !== 'boolean') || 
      (typeof(allowed_values) === 'object' && (typeof(allowed_values.values) !== 'object' || Array.isArray(allowed_values.values) === false))) {
      init_errors.allowed_values = '(allowed_values) must be an object with parameters (on: boolean) and (values: array)';
    }

    if(
      (typeof(regex_set) !== 'object') || 
      (typeof(regex_set) === 'object' && typeof(regex_set.on) !== 'boolean') || 
      (typeof(regex_set) === 'object' && (typeof(regex_set.values) !== 'object' || Array.isArray(regex_set.values) === false))) {
      init_errors.regex_set = '(regex_set) must be an object with parameters (on: boolean) and (values: array)';
    }

    if(typeof(function_called) !== 'function') {
      init_errors.function_called = '(function_called) must be a function';
    }

    if(typeof(file_name) !== 'object' && typeof(file_name) !== 'string') {
      init_errors.file_name = '(file_name) must be null or a string';
    }

    if(typeof(function_name) !== 'object' && typeof(function_name) !== 'string') {
      init_errors.function_name = '(function_name) must be null or a string';
    }

    if(typeof(function_directory) !== 'object' && typeof(function_directory) !== 'string') {
      init_errors.function_directory = '(function_directory) must be null or a string';
    }

    if(typeof(function_description) !== 'object' && typeof(function_description) !== 'string') {
      init_errors.function_description = '(function_description) must be null or a string';
    }

    if(typeof(base_param_names) !== 'object' && typeof(base_param_names) !== 'string') {
      init_errors.base_param_names = '(base_param_names) must be null or a string';
    }

    if(typeof(on) !== 'boolean') {
      init_errors.on = '(on) must be a boolean';
    }

    var size = Object.keys(init_errors).length;

    if(size > 0) { 

      for (const [key, value] of Object.entries(init_errors)) {
        console.log(`${key}: ${value} /n`);
       }    

       return false;

    }

    return true;

  }
  
  /*
    @param {regular_expression: string}: regular expression being tested
    @param {return_value: BigInt, number, string, undefined, null, object, boolean}: the value being tested against
  */
  
  function test(regular_expression, return_value) { 
    try {
      return new RegExp(regular_expression).test(return_value);
    } catch(err) { 
      return false;
    } 
  }

  /*
    export the error set
  */

  exports.errors = error_sets;

  