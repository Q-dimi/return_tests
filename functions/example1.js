
/*
  @param {tests: array}: test sets passed in as parameters. unit has same params as allowed_types, allowed_values and regex. Unit takes presidence over the values in the main object
  @param {allowed_types: object}: types allowed to be returned. Unit version takes presidence if set with same params
  @param {allowed_values: object}: values allowed to be returned. Unit version takes presidence if set with same params
  @param {regex_set: object}: if return value matches all in the regex set. Unit takes presidence.
  @param {function_called: function}: function created by programmer that is checked via tests. Each file gets its own function.
  @param {function_type: string}: regular or arrow function
  @param {directory: string}: directory name where the function lives.
  @param {function_name: string}: name of the function in the directory you got it from.
  @param {time_created: string}: the time the file was created.
  @param {still_exists: object}: whether the function in that file exists and whether it should be created again. Determined by @param {scan} in build.js
  @param {unit: object}: must be defined. takes three params which are objects with the same names as allowed_types, allowed_values, regex_set...same thing
  @param {index_of_set: number}: the index of the error set
  @param {developers: array}: the developers assigned
  @param {end_point_hit: string}: end point hit
  @param {client_hit: string}: client_hit
  @param {description: string}: description of the function
  @param {index: number}: index of file


  ***unit as object and index_of_set as number must be initialized to pass tests. (if unit is on, it will be tested first)
  
*/

module.exports = { 

    tests: [  
      { unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, a: 2, b: 5, c: 77 },
      { unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 2, a: 2, b: 5, c: 77 },
      { unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 3, a: 'hello world', b: 5, c: 77 },
      { unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 4, a: 2, b: 5, c: 77 },
      { unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 5, a: 2, b: 5, c: 77 }
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


