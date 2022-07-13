

module.exports = [

  { 

    function_called: {

      on: true,

      name: 'apple',

      filepath: '/sauce',

      description: 'apple sauce',

      param_names: 'apple, sauce',

      parameters: [[2, 10], [10, 2], [9,7]],

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

        index_exact: true,

        values: ['string', 'number']

      }, 
      
      allowed_values: {

        on: false,

        index_exact: false,

        values: [12, 12]

      }, 
      
      regex_set: {

        on: false,

        index_exact: true,

        values: [/^([0-9])$/, /^([0-9])$/]

      } 
    
    }, 
    
    index_of_set: 1 
  
  },

];