
/*
  @param {tests}: test sets passed in as parameters
  @param {allowed_types}: types allowed to be returned
  @param {allowed_values}: values allowed to be returned
  @param {regex_set}: if return value matches all in the regex set (could just use this)
  @param {function_called}: function created by programmer that is checked via tests. Each file gets its own function.
  @param {function_type}: regular or arrow function
  @param {directory}: directory name where the function lives.
  @param {function_name}: name of the function in the directory you got it from.
  @param {time_created}: the time the file was created.
  @param {still_exists}: whether the function in that file exists and whether it should be created again. Determined by @param {scan} in build.js
  @param {run_all}: when running tests for all files, run_all is checked and if false does not run. it true runs file
  @param {updated_function_if_no_match}: if scan finds function, make sure the function matches the function_called . if not, push the updated file function here.
*/

module.exports.developer_input =  { 

    tests: [],
      
    allowed_types: { 
      on: true, 
      values: [] 
    },  
      
    allowed_values: { 
      on: true, 
      values: [] 
    },
      
    regex_set: { 
      on: true, 
      values: [] 
    }, 
      
    function_called: function() {},

    function_type: null,
    
    directory: null,
    
    function_name: null, 
    
    time_created: null,
    
    still_exists: { 
      still_exists: true,
      other_possible_directories: []
    },
  
    run_all: false,
      
    updated_function_if_match_in_fname_and_directory: null, 
      
  }


