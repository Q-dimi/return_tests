//ill save this for the second version...just figure out the files thing and placing anfd whatever... maybe ill have two different build files.

// @param {configure}: the only thing the dev needs to worry about. 
// @param {directories}: the files you wish to search functions for add to functions folder
// @param {find}: find function, create file if file and function do not exist
// @param {scan}: scans for files which starting with the inside and compares with the outside.
// @param {presets}: when building files, decide whether you want to overwrite the original 
// @param {overwrite_original} will overwrite what gets inserted into the file if set to true.


// const configure = { 

//     single_file_to_test: '/functions/example.js',

//     test_all: false,

//     modules: [
//       '/functions/example.js',
//       '/functions/example.js',
//       '/functions/example.js',
//       '/functions/example.js',
//       '/functions/example.js',
//       '/functions/example.js',
//       '/functions/example.js',
//       '/functions/example.js',
//     ],

//     directories: [
//       `/test_directories/direcrory_1/file_1.js`,
//       `/test_directories/direcrory_1/file_2.js`,
//       `/test_directories/direcrory_1/file_3.js`,
//       `/test_directories/direcrory_2/file_1.js`,
//       `/test_directories/direcrory_2/file_2.js`,
//       `/test_directories/direcrory_2/file_3.js`,
//       `/test_directories/direcrory_3/file_1.js`,
//       `/test_directories/direcrory_3/file_2.js`,
//       `/test_directories/direcrory_3/file_3.js`
//     ],

//     preset_regex: { on: true, values: [], overwrite_original: false },

//     preset_allowed_values: { on: true, values: [], overwrite_original: false },

//     preset_allowed_types: { on: true, values: [], overwrite_original: false },

//     preset_run_all: { value: false, overwrite_original: false }, 

//     preset_tests: { values: [], overwrite_original: false }, 

//   }
  
  
  
  
  //this goes after config
  
  // var file = require('file-system');
  // var all_files = ``;
  // var all_functions = [];

  // // find();
  // // scan();

  // // function find() { 

  // //   for(let i = 0; i < configure.directories.length; i++) { 
  // //     file.readFile(configure.directories[i], 'utf8', function(err, data) { 
  // //       if(err) { 
  // //         console.log('There was an error reading this document');
  // //       } else { 
  // //         all_files += data.trim();
  // //       } 
  // //     });

  // //     //yeah, im not really sure. ill have to figure out something or else just get rid of this part and let the developer insert files manually which would probably be better
  // //     //just point left or right and get function name, parameters, then count brackets until match and function contents.
  // //     var current_function_string = '';
  // //     var bracket_count_left = 0;
  // //     var bracket_count_right = 0;
  // //     var regular_functions = all_files.split('function');
  // //     var arrow_functions = all_files.split('=>');

  // //     for(let i = 0; i < regular_functions.length; i++) { 

  // //     }

  // //     for(let i = 0; i < arrow_functions.length; i++) { 

  // //     }

  // //     var create = new Function();

  // //   }

  // // } 
  
  // // function scan() {
  // //   //scan and update
  // //  }


        //instead of iterating use fs or glob and just go through every file with a custom name. will be fname and directory
      
        // var found = true;
        // var i = 1;
        
        // while(found === true) {
          
        //   try { 
            
        //     var developer_input = require(`/functions/function_index_return_tests-${i}`);
            
        //     run_tests(
        //       developer_input.tests, 
        //       developer_input.allowed_types, 
        //       developer_input.allowed_values, 
        //       developer_input.regex_set, 
        //       developer_input.function_called, 
        //       `/functions/function_index_return_tests-${i}`,
        //       developer_input.function_name, 
        //       developer_input.directory
        //     );
            
        //     i++;
            
        //   } catch(err) { 
            
        //     found = false; //end of modules
            
        //   }