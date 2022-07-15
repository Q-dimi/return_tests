function test(test, return_value, j) {

    if(test.unit.allowed_types.on === true) {

        if(
            test.unit.allowed_types.index_exact === false && 
            test.unit.allowed_types.values.includes(typeof(return_value)) !== true
        ) { 
            return `type error: '${typeof(return_value)}' is not in the array of allowed types '${JSON.stringify(test.unit.allowed_types.values)}'/\n`;
        }

        if(
            test.unit.allowed_types.index_exact === true && 
            test.unit.allowed_types.values[j] !== typeof(return_value)
        ) { 
            return `type error: '${typeof(return_value)}' does not match the allowed type '${test.unit.allowed_types.values[j]}'/\n`;
        }

    }

    return 'PASSED';

}

module.exports = test;