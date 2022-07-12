var return_tests = require('../build');

var functions = [

  { 
    randomized: { 
      on: true, 
      parameters: ['number', 'number'], 
      when_obj_passed: ['number', 'string', 'BigInt'], 
      when_arr_passed: ['number', 'string', 'BigInt'], 
      multiply_amount: 20 
    },  

    function_called: {
      on: true, name: 'apple', 
      filepath: '/sauce', 
      description: 'apple sauce', 
      param_names: 'apple, sauce', 
      parameters: [1, 2],
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

for(let i = 0; i < errors.length; i++) { 
  console.log(errors[i]);
}

//optionally generate 
//var find_and_append_functions = return_tests.generate_functions('./file_written_to', { folders: '', files: [] });
//run tests