
/*
  @param {tests: array}: test sets
  @param {allowed_types: object}: allowed types returned  ... BigInt, number, string, object, undefined, boolean
  @param {allowed_values: object}: allowed values returned
  @param {regex_set: object}: regular expressions that must be passed
  @param {function_called: function}: your function. The one in object runs first if set to true. If not then others are set.
  @param {function_directory: string}: file of function
  @param {function_name: string}: name of function
  @param {unit: object}: unit objects are tested first if set to true. If not set or false, falls back to the below three objects.
  @param {index_of_set: number}: Error ser index
  @param {function_description: string}: description of the function
  @param {function_set: array of functions}: array of different functions you can stick in tests. multiply on this and stick this in function_called. Create a set of different functions and then run it through a multiplier where a different set of params is attahced to each one.
  @param {shared_index: number}: when multiplying out on one function. Taking that and making many object with different parameters.  

*/


module.exports = { 

    tests: [  
      { function_called: { on: true, function_name: '', function_directory: '', function_description: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } }, shared_index: 1, }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, a: 2, b: 5, c: 77 },
      { function_called: { on: true, function_name: '', function_directory: '', function_description: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } }, shared_index: 1, }, unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 2, a: 2, b: 5, c: 77 },
      { function_called: { on: true, function_name: '', function_directory: '', function_description: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } }, shared_index: 1, }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 3, a: 'hello world', b: 5, c: 77 },
      { function_called: { on: true, function_name: '', function_directory: '', function_description: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } }, shared_index: 1, }, unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 4, a: 2, b: 5, c: 77 },
      { function_called: { on: true, function_name: '', function_directory: '', function_description: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } }, shared_index: 1, }, unit: { allowed_types: { on: false, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 5, a: 2, b: 5, c: 77 }
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
    
    function_directory: null,
    
    function_name: null, 

    function_description: 'this function...',

    function_set: [
      { function_called: '',  function_name: '', function_directory: '', function_description: '', on: false, function: function() {}, shared_index: 0}
    ]
      
  }


