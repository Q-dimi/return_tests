
/*
  @param {single_function_to_test}: one file to test that you choose. 
  @param {test_all}: whether to test all files or not. 
  @param {all_functions_to_test}: all the files which have a function to test. 
*/

const configure = { 

    test_all: true,

    single_function_to_test: './functions/example2.js',

    all_functions_to_test: [
      './functions/example1.js',
      './functions/example2.js',
      './functions/example3.js',
    ],

    scan_and_create_files: { 
      run: false, 
      push_to_all_functions_to_test: false 
    }

  }

  if(configure.scan_and_create_files.run === true) { 
    var file_list = require('./scan.js');
    if(configure.scan_and_create_files.push_to_all_functions_to_test === true) {
      configure.all_functions_to_test = configure.all_functions_to_test.concat(file_list);
    }
  }
  
  /*
    @param {developer_input}: imported data
    @param {tests}: array of objects to run tests
    @param {allowed_types}: allowed return types
    @param {allowed_values}: allowed return values
    @param {regex_set}: allowed regular expressions
    @param {function_called}: function passed 
    @param {error_sets}: exported set of objects that did not pass test
  */
  
  var error_sets = [];

  switch(configure.test_all) { 
      
    case false: 

        try {
      
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
  
  /*
    check tests
  */
          
  function run_tests(tests, allowed_types, allowed_values, regex_set, function_called, file_name, function_name, directory) {
  
    for(let i = 0; i < tests.length; i++) { 
  
      var params = [];
  
      for (const [key, value] of Object.entries(tests[i])) {
       if(key === 'index_of_set' || key === 'unit') continue;
       params.push(value);
      }
  
      var return_value = function_called(...params);
      var err_object = tests[i];
      var error_count = 0;

      //first check unit sweet and if true, test on sweet else if check on this else, both off...
  
      if(allowed_types.on === true) {
  
        if(allowed_types.values.includes(typeof(return_value)) !== true) {
  
          err_object.error_type = true;
  
          err_object.error_type_message = `The value returned is not within the allowed types.`;
  
          err_object.error_type_rtype = typeof(return_value);
  
          err_object.error_type_value = return_value;
  
          error_count++;
  
        }
  
      }

      //first check unit_sweet then check this
  
      if(allowed_values.on === true) {
  
        if(
          typeof(return_value) === 'number' || 
          typeof(return_value) === 'BigInt' || 
          typeof(return_value) === 'string' ||  
          typeof(return_value) === 'undefined' ||  
          typeof(return_value) === 'boolean'
        ) {
  
          if(allowed_values.values.includes(return_value) !== true) { 
  
            err_object.error_value = true;
  
            err_object.error_value_message = `The value returned is not within the allowed values.`;
  
            err_object.error_value_rvalue = return_value;
  
            err_object.error_value_type = typeof(return_value);
  
            error_count++;
  
          }
  
         } else if(typeof(return_value) === 'object') { 
  
           var match = false;
  
           for(let i = 0; i < allowed_values.values.length; i++) { 
             if(typeof(allowed_values.values[i]) === 'object') {
              if(JSON.stringify(allowed_values.values[i]).toLowerCase().trim() === JSON.stringify(return_value).toLowerCase().trim()) { 
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

      //first check unit_sweet then check this
    
      if(regex_set.on === true) {

        var regex_pass = false;
  
        for(let i = 0; i < regex_set.values.length; i++) { 
  
          var test_regex = test(regex_set.values[i], return_value);
  
          if(test_regex !== true) { 
  
            if(regex_pass === false) { 
              err_object.error_regex = true;
              regex_pass = true; 
            };
  
            err_object[`error_regex_message-${i}`] = `The value returned does not pass`;
  
            err_object[`error_regex_regular_expression-${i}`] = regex_set.values[i];
  
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

        err_object.index_of_error_set = tests[i].index_of_set ? tests[i].index_of_set : 'index not found';

        error_sets.push(err_object);

      }
  
    }
         
  }
  
  /*
    @param {regular_expression}: regular expression being tested
    @param {return_value}: the value being tested against
  */
  
  function test(regular_expression, return_value) { 
    try {
      return new RegExp(regular_expression).test(return_value);
    } catch(err) { 
      return err.message;
    } 
  }
  
  /*
    export the error set
  */

  for(let i = 0; i < error_sets.length; i++) { 
    console.log(JSON.stringify(error_sets[i]) + '\n \n');
  }

  module.exports = error_sets;
  