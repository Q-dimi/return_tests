function test(test, return_value, i, j) {

    if(
        typeof(test.unit.allowed_types) !== 'object' || 
        typeof(test.unit.allowed_types.on) !== 'boolean' || 
        (typeof(test.unit.allowed_types.values) !== 'object' || 
        Array.isArray(test.unit.allowed_types.values) === false) || 
        typeof(test.unit.allowed_types.index_exact) !== 'boolean'
    ) {
        throw new Error(`function index: ${i}\nerror: (unit.allowed_types) must be an object with parameters (on: boolean) (values: array) (index_exact: boolean)`);
    }

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