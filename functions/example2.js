
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

module.exports = { 

    tests: [  
      { index_of_set: 1, a: 2, b: 5, c: { a: 2, b: 4 } },
      { index_of_set: 2, a: 7, b: 5, c: 'awesome man' },
      { index_of_set: 3, a: 'hellow', b: 5, c: 'cool sauce'},
      { index_of_set: 4, a: 2, b: 5,  j: { d: 7, d: 88 } },
      { index_of_set: 5, a: 2, b: 3, f: 66 }
    ],
      
    allowed_types: { 
      on: true, 
      values: ['number', 'BigInt'] 
    },  
      
    allowed_values: { 
      on: true, 
      values: [7, 12] 
    },
      
    regex_set: { 
      on: false, 
      values: [] 
    }, 
      
    function_called: 
       function (a, b) {
        return 'hello world';
      },

    function_type: null,
    
    directory: null,
    
    function_name: null, 
    
    time_created: null,
    
    still_exists: { 
      still_exists: true,
      other_possible_directories: []
    },
  
    run_all: true,
      
    updated_function_if_match_in_fname_and_directory: null, 
      
  }


