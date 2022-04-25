
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
  @param {function_set_multiplied: array of functions}: Multiply each function with different parameters and stick in tests. Recreates what is in tests now.
  @ if you want you can add a database to this and pull in values from the database in build.js and stick them in tests
*/


module.exports = { 

    tests: [
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
      { randomized: { on: true, parameters: ['number', 'string', 'object'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], folder_name: '', multiply_amount: 17 }, function_called: { on: true, function_name: '', function_directory: '', function_description: '', base_param_names: '', function: function (a, b) { try { return a + b; } catch(err) { return err; } } }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: false, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1, parameters: { a: 2, b: 5, c: 77 } },
    ]
      
  }


