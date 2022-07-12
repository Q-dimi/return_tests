var return_tests = require('../build');

var functions = [

  { 
    randomized: { 
      on: false, 
      parameters: ['number', 'number'], //string, null, undefined, boolean, object, number, random
      when_obj_passed: ['number', 'string'], //string, null, undefined, boolean, number
      when_arr_passed: ['number', 'string'], //string, null, undefined, boolean, number
      multiply_amount: 2
    },  

    function_called: {
      on: true, 
      name: 'apple', 
      filepath: '/sauce', 
      description: 'apple sauce', 
      param_names: 'apple, sauce', 
      parameters: [1, 10],
      function: function (a, b) { 
        try { 
          return a + b; 
        } catch(err) { 
          return err; 
        } 
      }
    }, 
    
    unit: { 

      allowed_types: { 
        on: false, 
        values: ['number'] 
      }, 
      
      allowed_values: { 
        on: false, 
        values: [7, 12] 
      }, 
      
      regex_set: { 
        on: true, 
        values: [/^([0-9])$/] 
      } 
    
    }, 
    
    index_of_set: 1 
  
  },

];

var errors = [];

try { 
  errors = return_tests.run(functions);
} catch(err) { 
  console.log(err.message)
}

console.log(errors);

// for(let i = 0; i < errors.length; i++) { 
//   console.log(errors[i]);
// }

//optionally generate 
//var find_and_append_functions = return_tests.generate_functions('./file_written_to', { folders: '', files: [] });
//run tests