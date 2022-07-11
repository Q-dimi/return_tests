
/*
  examples
*/

module.exports = { 
    tests: [
      { randomized: { on: true, parameters: ['number', 'number'], when_obj_passed: ['number', 'string', 'BigInt'], when_arr_passed: ['number', 'string', 'BigInt'], multiply_amount: 20 },  function_called: { on: true, name: 'apple', filepath: '/sauce', description: 'apple sauce', param_names: 'apple, sauce', function: function (a, b) { try { return a + b; } catch(err) { return err; } }, parameters: [1, 2] }, unit: { allowed_types: { on: true, values: ['number', 'BigInt'] }, allowed_values: { on: true, values: [7, 12] }, regex_set: { on: false, values: [] } }, index_of_set: 1 },
    ] 
  }