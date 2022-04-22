
/*
  @param {single_function_to_test: string}: one file to test that you choose. 
  @param {test_all: boolean}: whether to test all files or not. 
  @param {all_functions_to_test: array}: all the files which have a function to test. 
  @param {scan_and_create_files: object}: scan files for functions and create files with those functions and push those to db
  @param {db: object}: database insertion and pull. 
  //just pull the functions and put them in all_functions_to_test
*/

const configure = { 

    execute: true,

    test_all: true,

    selected_set_to_test: [], //check box and push on server side as selected set... then click run and run these... (12 functions selected clickto view vs view all)

    single_function_to_test: './functions/example2.js', //delete

    all_functions_to_test: [ //delete
      './functions/example1.js',
      './functions/example2.js',
      './functions/example3.js',
    ],

    db: { 
      file_pull_config: { file: "./src/routes/pull_config", on: false },
      file_push_errors: { file: "./src/routes/push_errors", on: false },
    }

  }

  if(configure.db.file_pull_config.on === true) { 

    fetch(`${configure.db.file_pull_config.file}`)

    .then((data) => data.text())

    .then((response) => {

      response = JSON.parse(response);

      configure.test_all = response.test_all;

      configure.all_functions_to_test = response.all_functions_to_test; 

      configure.all_functions_to_test = response.all_functions_to_test; 

      configure.db.file_pull_config.file = response.db.file_pull_config.file;

      configure.db.file_pull_config.on = response.db.file_pull_config.on;

      configure.db.file_push_errors.file = response.db.file_push_errors.file;

      configure.db.file_push_errors.on = response.db.file_push_errors.on;

    }).catch(err => { 

      console.log(err);

    });

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

  if(configure.execute === true) {

    switch(configure.test_all) { 
        
      case false: 

          try {

            //run selcted set...
        
            var developer_input = require(configure.single_function_to_test);
                                    
            run_tests(
              developer_input.tests, 
              developer_input.allowed_types, 
              developer_input.allowed_values, 
              developer_input.regex_set, 
              developer_input.function_called, 
              configure.single_function_to_test, 
              developer_input.function_name, 
              developer_input.directory
            );

          } catch(err) { 

            console.log(err.message);

          }
        
      break;
        
      case true:

          //run selected set
      
          for(let i = 0; i < configure.all_functions_to_test.length; i++) { 

            try {

              var developer_input = require(configure.all_functions_to_test[i]);

              if(developer_input.run_all === true) {

                run_tests(
                  developer_input.tests, 
                  developer_input.allowed_types, 
                  developer_input.allowed_values, 
                  developer_input.regex_set, 
                  developer_input.function_called, 
                  configure.all_functions_to_test[i],
                  developer_input.function_name, 
                  developer_input.directory
                );

              }

            } catch(err) { 

              console.log(err.message);

            }

          }
            
      break;
        
      default: 
        
        console.log(`error: test_all must be true or false`);
    
    }

}
  
  /*
    check tests...
  */
          
  function run_tests(tests, allowed_types, allowed_values, regex_set, function_called, file_name, function_name, directory) {

    var init_errors = {};

    if((typeof(tests) !== 'object') || Array.isArray(tests) === false) {
      init_errors.tests = '(tests) need to be defined as an array with object (unit: object) and (index_of_set: index)';
    }

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

    if(typeof(directory) !== 'object' && typeof(directory) !== 'string') {
      init_errors.directory = '(directory) must be null or a string';
    }

    var size = Object.keys(init_errors).length;

    if(size > 0) { 

      console.log(`Directory of Error: ${typeof(directory) !== 'undefined' ? directory : 'undefined'} ---------------------------------- /n`);

      for (const [key, value] of Object.entries(init_errors)) {
        console.log(`${key}: ${value} /n`);
       }    

       return;

    }
  
    for(let i = 0; i < tests.length; i++) { 

      if(
        (typeof(tests[i]) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].index_of_set) !== 'number')
      ) {

        console.log(`
          (tests) need to be defined as an object with object
          (unit: object) and (index_of_set: index)
          ${i}: ${typeof(tests[i].index_of_set) !== 'undefined' ? tests[i].index_of_set : 'index not found'}
        `);

        continue;

      }
  
      var params = [];
  
      for (const [key, value] of Object.entries(tests[i])) {
       if(key === 'index_of_set' || key === 'unit') continue;
        params.push(value);
      }
  
      var return_value = function_called(...params);
      var err_object = tests[i];
      var error_count = 0;

      var allowed_types_unit_or_single = (
        typeof(tests[i].unit.allowed_types) !== 'undefined' && tests[i].unit.allowed_types.on === true && Array.isArray(tests[i].unit.allowed_types.values) ?
        { on: true, test: 'unit', v: tests[i].unit.allowed_types } : allowed_types.on === true ?
        { on: true, test: 'single', v: allowed_types } : 
        { on: false, test: 'off' }
      );
  
      if(allowed_types_unit_or_single.on === true) {
  
        if(allowed_types_unit_or_single.v.values.includes(typeof(return_value)) !== true) {
  
          err_object.error_type = true;
  
          err_object.error_type_message = `The value returned is not within the allowed types.`;
  
          err_object.error_type_rtype = typeof(return_value);
  
          err_object.error_type_value = return_value;
  
          error_count++;
  
        }
  
      }

      var allowed_values_unit_or_single = (
        typeof(tests[i].unit.allowed_values) !== 'undefined' && tests[i].unit.allowed_values.on === true && Array.isArray(tests[i].unit.allowed_values.values) ? 
        { on: true, test: 'unit', v: tests[i].unit.allowed_values } : allowed_values.on === true ? 
        { on: true, test: 'single', v: allowed_values } : 
        { on: false, test: 'off' }
      );
  
      if(allowed_values_unit_or_single.on === true) {
  
        if(
          typeof(return_value) === 'number' || 
          typeof(return_value) === 'BigInt' || 
          typeof(return_value) === 'string' ||  
          typeof(return_value) === 'undefined' ||  
          typeof(return_value) === 'boolean'
        ) {
  
          if(allowed_values_unit_or_single.v.values.includes(return_value) !== true) {  
  
            err_object.error_value = true;
  
            err_object.error_value_message = `The value returned is not within the allowed values.`;
  
            err_object.error_value_rvalue = return_value;
  
            err_object.error_value_type = typeof(return_value);
  
            error_count++;
  
          }
  
         } else if(typeof(return_value) === 'object') { 
  
           var match = false;
  
           for(let i = 0; i < allowed_values_unit_or_single.v.values.length; i++) { 
             if(typeof(allowed_values_unit_or_single.v.values[i]) === 'object') { 
              if(JSON.stringify(allowed_values_unit_or_single.v.values[i]).toLowerCase().trim() === JSON.stringify(return_value).toLowerCase().trim()) { 
                match = true;
                break;
              }
             }
           }
  
           if(match === false) { 
  
              err_object.error_value = true;
  
              err_object.error_value_message = `The value returned is not within the allowed values.`;
  
              err_object.error_value_rvalue = return_value;
  
              err_object.error_value_type = typeof(return_value);
  
              error_count++;
  
           }
  
         } else { 
  
           console.log(`
            error: the only allowed types are number, BigInt, string, boolean, undefined and object
           `);
  
         }
  
      }

      var allowed_regex_unit_or_single = (
        typeof(tests[i].unit.regex_set) !== 'undefined' && tests[i].unit.regex_set.on === true && Array.isArray(tests[i].unit.regex_set.values) ? 
        { on: true, test: 'unit', v: tests[i].unit.regex_set } : regex_set.on === true ? 
        { on: true, test: 'single', v: regex_set } : 
        { on: false, test: 'off' }
      );
    
      if(allowed_regex_unit_or_single.on === true) {

        var regex_pass = false;
  
        for(let i = 0; i < allowed_regex_unit_or_single.v.values.length; i++) {  
  
          var test_regex = test(allowed_regex_unit_or_single.v.values[i], return_value); 
  
          if(test_regex !== true) { 
  
            if(regex_pass === false) { 
              err_object.error_regex = true;
              regex_pass = true; 
            };
  
            err_object[`error_regex_message-${i}`] = `The value returned does not pass`;
  
            err_object[`error_regex_regular_expression-${i}`] = allowed_regex_unit_or_single.v.values[i];
  
            err_object[`error_regex_return_value-${i}`] = return_value;
  
            err_object[`error_regex_returned_rejex-${i}`] = test_regex;
  
            error_count++;
  
          }
  
        }
  
      }
  
      if(error_count > 0) { 

        err_object.function_name = function_name;

        err_object.directory = directory;

        err_object.file_name = file_name;

        err_object.index_of_error_set = typeof(tests[i].index_of_set) !== 'undefined' ? tests[i].index_of_set : 'index not found';

        error_sets.push(err_object);

      }
  
    }
         
  }
  
  /*
    @param {regular_expression: string}: regular expression being tested
    @param {return_value: BigInt, number, string, undefined, null, object, undefined, boolean}: the value being tested against
  */
  
  function test(regular_expression, return_value) { 
    try {
      return new RegExp(regular_expression).test(return_value);
    } catch(err) { 
      return err.message;
    } 
  }

  if(configure.execute === true) {

    /*
      export the error set
    */

    for(let i = 0; i < error_sets.length; i++) { 
      console.log(JSON.stringify(error_sets[i]) + '\n \n');
    }

    /*
      push error set to db 
    */

    if(configure.db.file_push_errors.on === true) {
      fetch(`${configure.db.file_push_errors.file}?data=${JSON.stringify(error_sets)}`)
      .then((data) => data.text())
      .then((response) => {
        console.log(response);
      }).catch(err => { 
        console.log(err);
      });
    }

    exports.errors = error_sets;

}
  