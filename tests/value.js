function test(test, return_value, j) { 

    if(test.unit.allowed_values.on === true) {

        if(return_value === null || typeof(return_value) !== 'object') {

          if(
            test.unit.allowed_values.index_exact === false && 
            test.unit.allowed_values.values.includes(return_value) !== true
          ) { 
            return `value error: '${return_value}' is not in the array of allowed values '${typeof(test.unit.allowed_values.values) === 'object' ? JSON.stringify(test.unit.allowed_values.values) : test.unit.allowed_values.values}'/\n`;
          }

          if(
            test.unit.allowed_values.index_exact === true && 
            test.unit.allowed_values.values[j] !== return_value
          ) { 
            return `value error: '${return_value}' does not match the allowed value '${typeof(test.unit.allowed_values.values[j]) === 'object' ? JSON.stringify(test.unit.allowed_values.values[j]) : test.unit.allowed_values.values[j]}'/\n`;
          }

        } 
        
        if(typeof(return_value) === 'object') { 

          if(test.unit.allowed_values.index_exact === false) {

            var match = false;

            for(let k = 0; k < test.unit.allowed_values.values.length; k++) { 
              if(typeof(test.unit.allowed_values.values[k]) === 'object') { 
                if(JSON.stringify(test.unit.allowed_values.values[k]) === JSON.stringify(return_value)) { 
                  match = true;
                  break;
                }
              }
            }

            if(match === false) { 
              return `value error: '${JSON.stringify(return_value)}' is not in the array of allowed values '${JSON.stringify(test.unit.allowed_values.values)}'/\n`;
            }

          }

          if(
            test.unit.allowed_values.index_exact === true && 
            JSON.stringify(test.unit.allowed_values.values[j]) !== JSON.stringify(return_value)
          ) { 
            return `value error: '${JSON.stringify(return_value)}' does not match the allowed value '${typeof(test.unit.allowed_values.values[j]) === 'object' ? JSON.stringify(test.unit.allowed_values.values[j]) : test.unit.allowed_values.values[j]}'/\n`;
          }

        }

    }

    return 'PASSED';

}

module.exports = test;