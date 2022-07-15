function test(test, return_value, j) {

    if(
        typeof(test.unit.regex_set) !== 'object' || 
        typeof(test.unit.regex_set.on) !== 'boolean' || 
        (typeof(test.unit.regex_set.values) !== 'object' || 
        Array.isArray(test.unit.regex_set.values) === false) || 
        typeof(test.unit.regex_set.index_exact) !== 'boolean'
      ) {
        throw new Error('(unit.regex_set) must be an object with parameters (on: boolean) and (values: array)');
      }

    if(test.unit.regex_set.on === true) {

        if(test.unit.regex_set.index_exact === false) {
            var es = '';
            for(let k = 0; k < test.unit.regex_set.values.length; k++) { 
                if(wow(test.unit.regex_set.values[k], return_value) !== true) { 
                    es += `regex error: '${typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value}' does not pass '${test.unit.regex_set.values[k]} (index ${k})'/\n`;
                }
            }
            if(es.trim().length > 0) { 
                return es;
            }
        }

        if(test.unit.regex_set.index_exact === true) { 
            if(wow(test.unit.regex_set.values[j], return_value) !== true) { 
                return `regex error: '${typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value}' does not pass '${test.unit.regex_set.values[j]}'/\n`;
            }
        }

    }

    return 'PASSED';

}

function wow(regular_expression, return_value) { 
    try {
        return regular_expression.test(return_value);
    } catch(err) { 
        return false;
    } 
}

module.exports = test;