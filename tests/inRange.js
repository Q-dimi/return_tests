function test(test, return_value, i, j) { 
    if(
        typeof(test.unit.in_range) !== 'object' || 
        typeof(test.unit.in_range.on) !== 'boolean' || 
        (typeof(test.unit.in_range.values) !== 'object' || 
        Array.isArray(test.unit.in_range.values) === false) || 
        typeof(test.unit.in_range.index_exact) !== 'boolean'
    ) {
        throw new Error(`function index: ${i}\nerror: (unit.in_range) must be an object with parameters (on: boolean) (values: array) (index_exact: boolean)`);
    }
    if(test.unit.in_range.on === true) { 
        if(test.unit.in_range.index_exact === false) { 
            var found = false; 
            for(let k = 0; k < test.unit.in_range.values.length; k++) { 
                if(return_value >= test.unit.in_range.values[k][0] && return_value <= test.unit.in_range.values[k][1]) { //types check everywhere on tests
                    found = true;
                    break;
                }
            }
            if(found === false) { 
                return `inRangeError: '${return_value}' is not in the range of all the sets in the array '${JSON.stringify(test.unit.in_range.values)}'\n`;
            }
        }
        if(test.unit.in_range.index_exact === true) { 
            if(return_value < test.unit.in_range.values[j][0] || return_value > test.unit.in_range.values[j][1]) { 
                return `inRangeError: '${return_value}' is not in the range '${JSON.stringify(test.unit.in_range.values[j])}'\n`; 
            }
        }
    }
    return 'PASSED';
}
module.exports = test;