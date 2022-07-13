

module.exports = [

  { 

    /*
      standard test example. 
      compares unit.allowed_values.values array 
      with function_called.parameters array (return values)
      AT each index. Every test case must match one specific 
      index in unit.allowed_values.values
    */

    function_called: {

      on: true,

      name: 'apple',

      filepath: '/sauce',

      description: 'apple sauce',

      param_names: 'apple, sauce',

      parameters: [[2, 12], [30, 2], [3, 23], [22, 22]],

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

        index_exact: true,

        values: ['string', 'number']

      }, 
      
      allowed_values: {

        on: true,

        index_exact: true,

        values: [11, 12, 'hello world', 44]

      }, 
      
      regex_set: {

        on: false,

        index_exact: true,

        values: [/^([0-9])$/, /^([0-9])$/]

      } 
    
    }  

  },

];