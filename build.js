
/*
  Author: Alexander Eatman 
  Year: 2022
  Description: Checks if the return values of functions matches a regular expression, input type and input value each or seperately

  @param {configure}: the only thing the dev needs to worry about. 
  @param {directories}: the files you wish to search functions for add to functions folder
  @param {find}: find function, create file if file and function do not exist
  @param {scan}: scans for files which starting with the inside and compares with the outside.
  @param {presets}: when building files, decide whether you want to overwrite the original 
  @param {overwrite_original} will overwrite what gets inserted into the file if set to true.
*/

const configure = { 

    single_file_to_test: '/functions/example.js',

    test_all: false,

    directories: [
      `/test_directories/direcrory_1/file_1.js`,
      `/test_directories/direcrory_1/file_2.js`,
      `/test_directories/direcrory_1/file_3.js`,
      `/test_directories/direcrory_2/file_1.js`,
      `/test_directories/direcrory_2/file_2.js`,
      `/test_directories/direcrory_2/file_3.js`,
      `/test_directories/direcrory_3/file_1.js`,
      `/test_directories/direcrory_3/file_2.js`,
      `/test_directories/direcrory_3/file_3.js`
    ],

    preset_regex: { on: true, values: [], overwrite_original: false },

    preset_allowed_values: { on: true, values: [], overwrite_original: false },

    preset_allowed_types: { on: true, values: [], overwrite_original: false },

    preset_run_all: { value: false, overwrite_original: false }, 

    preset_tests: { values: [], overwrite_original: false }, 

  }
  
  var file = require('file-system');
  
  function find() { 
    //find and append to end if it does not exist
  } 
  
  function scan() {
    //scan and update
   }
  
  /*
    @param {developer_input}: developers input data ***
    @param {tests}: array of objects to run tests ***
    @param {allowed_types}: allowed return types ***
    @param {allowed_values}: allowed return values ***
    @param {regex_set}: allowed regular expressions ***
    @param {function_called}: function passed from client with parameters passed via dev ***
    @param {test_all}: boolean deciding ro test one or all file
    @param {single_file_to_test}: If test all is off, . 
  */
  
  const test_all = configure.test_all;
  const single_file_to_test = configure.single_file_to_test;
  
  switch(test_all) { 
      
    case false: 
      
      var developer_input = require(single_file_to_test);
                              
      run_tests(
        developer_input.tests, 
        developer_input.allowed_types, 
        developer_input.allowed_values, 
        developer_input.regex_set, 
        developer_input.function_called, 
        single_file_to_test, 
        developer_input.function_name, 
        developer_input.directory
      );
      
    break;
      
    case true:
      
      var found = true;
      var i = 1;
      
      while(found === true) {
        
        try { 
          
          var developer_input = require(`/functions/function_index_return_tests-${i}`);
          
          run_tests(
            developer_input.tests, 
            developer_input.allowed_types, 
            developer_input.allowed_values, 
            developer_input.regex_set, 
            developer_input.function_called, 
            `/functions/function_index_return_tests-${i}`,
            developer_input.function_name, 
            developer_input.directory
          );
          
          i++;
          
        } catch(err) { 
          
          found = false; //end of modules
          
        }
        
      }
          
    break;
      
    default: 
      
      console.log(`error: test_all must be true or false`);
  
  }
  
  /*
    @param {error_set}: exported set of objects that did not pass test
    @param {error_text}: error text exported
  */
  
  var error_sets = [];
  
  /*
    check tests
  */
          
  function run_tests(tests, allowed_types, allowed_values, regex_set, function_called, file_name, function_name, directory) {
  
    for(let i = 0; i < tests.length; i++) { 
  
      var params = [];
  
      for (const [key, value] of Object.entries(tests[i])) {
       if(key === 'index_of_set') continue;
       params.push(value);
      }
  
      var return_value = function_called(...params);
      var err_object = tests[i];
      var error_count = 0;
  
      if(allowed_types.on === true) {
  
        if(allowed_types.values.includes(typeof(return_value)) !== true) {
  
          err_object.error_type = true;
  
          err_object.error_type_message = `The value returned is not within the allowed types.`;
  
          err_object.error_type_rtype = typeof(return_value);
  
          err_object.error_type_value = return_value;
  
          error_count++;
  
        }
  
      }
  
      if(allowed_values.on === true) {
  
        if(
          typeof(return_value) === 'number' || 
          typeof(return_value) === 'BigInt' || 
          typeof(return_value) === 'string' ||  
          typeof(return_value) === 'undefined' ||  
          typeof(return_value) === 'null' ||
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
              if(JSON.stringify(allowed_values.values[i]).trim() === JSON.stringify(return_value).trim()) { 
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
            error: the only allowed types are number, BigInt, string, boolean, undefined, null and object
           `);
  
         }
  
      }
  
      var regex_pass = false;
  
      if(regex_set.on === true) {
  
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
    @param {total}: the value being tested against
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

  console.log(error_sets); /*888888888888*/
  module.exports.errors = error_sets;
  