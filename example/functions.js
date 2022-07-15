

module.exports = [

  { 

    /*
      standard test example. 
      compares unit.allowed_values.values array 
      with the function_called.parameters array
      AT each index. Return value from function_called.parameters[i]
      must match unit.allowed_values.values[i]. 
    */

    function_called: {

      on: true,

      name: 'apple',

      filepath: '/sauce',

      description: 'apple sauce',

      param_names: 'apple, sauce',

      parameters: [[2, 6], [3, 2], [3, 23], [22, 22]], //each return value at index must match below (last will pass)

      function: function (a, b) {
        try { 
          return a + b; 
        } catch(err) { 
          return err; 
        } 
      }

    }, 
    
    unit: { 

      allowed_values: {

        on: true,

        index_exact: false,

        values: [{a: '3'}, 12, 'hello world', 44] //each index must match above (last will pass)

      }, 

      allowed_types: {

        on: false,

        index_exact: true,

        values: ['number', 'string', 'string', 'string']

      }, 
      
      regex_set: {

        on: false,

        index_exact: false,

        values: [/^([0-9])$/, /^([0-9])$/, /^([0-9])$/, /^([0-9])$/]

      } 
    
    }  

  },

];