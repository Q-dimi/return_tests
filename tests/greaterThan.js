function test(test, return_value, i, j) { 

    if(
        typeof(test.unit.is_greater_than) !== 'object' || 
        typeof(test.unit.is_greater_than.on) !== 'boolean' || 
        (typeof(test.unit.is_greater_than.values) !== 'object' || 
        Array.isArray(test.unit.is_greater_than.values) === false) || 
        typeof(test.unit.is_greater_than.index_exact) !== 'boolean'
    ) {
        throw new Error(`function index: ${i}\nerror: (unit.is_greater_than) must be an object with parameters (on: boolean) (values: array) (index_exact: boolean)`);
    }

    if(test.unit.is_greater_than.on === true) { 

        if(test.unit.is_greater_than.index_exact === false) { 

            var found = false;
            
            for(let k = 0; k < test.unit.is_greater_than.values.length; k++) { 
                if(return_value > test.unit.is_greater_than.values[k]) {
                    found = true;
                    break;
                }
            }

            if(found === false) { 
                return `greaterThanError: '${return_value}' is less than all of the values in the array '${JSON.stringify(test.unit.is_greater_than.values)}'/\n`;
            } 

        }

        if(test.unit.is_greater_than.index_exact === true) { 
            if(return_value < test.unit.is_greater_than.values[j]) { 
                return `greaterThanError: '${return_value}' is less than '${test.unit.is_greater_than.values[j]}'/\n`;
            }
        }

    }

    return 'PASSED';

}

module.exports = test;