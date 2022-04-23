
/*
  @param {tests: array}: test sets
  @param {allowed_types: object}: allowed types returned  ... BigInt, number, string, object, undefined, boolean
  @param {allowed_values: object}: allowed values returned
  @param {regex_set: object}: regular expressions that must be passed
  @param {function_called: function}: your function
  @param {function_type: string}: regular or arrow function
  @param {directory: string}: file of function
  @param {function_name: string}: name of function
  @param {time_created: string}: time created
  @param {still_exists: object}: If the function exists
  @param {unit: object}: unit objects are tested first if set to true. If not set or false, falls back to the below three objects.
  @param {index_of_set: number}: Error ser index
  @param {developers: array}: the developers assigned
  @param {end_point_hit: string}: end point hit
  @param {client_hit: string}: client hit
  @param {description: string}: description of the function
  @param {index: number}: index of file  
  //will add a function parameter called function_called in the array. This will act as function_called in the bottom portion. Will do the same thing.
  //now you can create a config set and run a random set of paramters on each function for it... and just do that for all functions...
*/

module.exports = { 

    tests: [  
      { function_called: { on: false, function: '' }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, a: 2, b: 5, c: 77 },
      { function_called: { on: false, function: '' }, unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 2, a: 2, b: 5, c: 77 },
      { function_called: { on: false, function: '' }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 3, a: 'hello world', b: 5, c: 77 },
      { function_called: { on: false, function: '' }, unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 4, a: 2, b: 5, c: 77 },
      { function_called: { on: false, function: '' }, unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 5, a: 2, b: 5, c: 77 }
    ],
      
    allowed_types: { 
      on: false, 
      values: ['number', 'BigInt'] 
    },  
      
    allowed_values: { 
      on: false, 
      values: [7, 12] 
    }, 
      
    regex_set: { 
      on: false, 
      values: [] 
    }, 
      
    function_called: 
       function (a, b) {
        try { 
          return a + b; 
        } catch(err) {
          return err; 
        } 
      },

    function_type: null,
    
    directory: null,
    
    function_name: null, 
    
    time_created: null,
    
    still_exists: { 
      still_exists: true,
      other_possible_directories: []
    },
        
    developers_assigned: [{ 
      name: null,
      email: null,
      phone: null
    }],

    end_point_hit: null,

    client_hit: null,

    description: 'this function...',

    index: 1
      
  }


