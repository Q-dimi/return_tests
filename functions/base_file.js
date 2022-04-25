
/*
    please see README for param descriptions... copy this in an example file in this folder and modify it how you wish. then add the file name to the config array at the top of build.js
*/


module.exports = { 

    tests: [
        {

            randomized: {
                on: true,
                parameters: ['number', 'string', 'BigInt', 'object', 'array', 'boolean', 'undefined', 'null', 'random'],
                when_obj_passed: ['number', 'string', 'BigInt', 'undefined', 'null', 'boolean'],
                when_arr_passed: ['number', 'string', 'BigInt', 'undefined', 'null', 'boolean'],
                multiply_amount: 5
            },

            function_called: {
                on: true,
                function_name: 'your function name',
                function_directory: 'directory where function lives',
                function_description: 'function description',
                base_param_names: 'parameter names in case random parameters are passed in',
                function: function(a, b) {
                    try {
                        return a + b;
                    } catch (err) {
                        return err;
                    }
                }
            },

            unit: {
                allowed_types: {
                    on: true,
                    values: ['number', 'BigInt', 'string', 'undefined', 'boolean', 'object']
                },
                allowed_values: {
                    on: true,
                    values: [7, 12, 'hello world', {name: 'alex'}, false, undefined, null, [1, 2, 3]]
                },
                regex_set: {
                    on: false,
                    values: ['/123/', '/345/']
                }
            },

            index_of_set: 1,

            parameters: {
                a: 2,
                b: 5,
                c: 77,
                d: 'this will populate with random parameters with randomized.parameters if randomized.on is true and function_called.on is true. the length of the set is the length of the randomized.parameters array. each index is the type passed back'
            }

        },    
        
    ]
      
  }


