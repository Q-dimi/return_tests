var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value is in-between one or all of test.unit.in_range.values ([[range_low], [range_high]])
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.in_range, 
  test.unit.in_range.on, 
  test.unit.in_range.values, 
  test.unit.in_range.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.in_range) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.in_range.on === true) { 

  if(test.unit.in_range.index_exact === false) { 
   var found = false; 
   for(let k = 0; k < test.unit.in_range.values.length; k++) { 
    if(
     return_value >= test.unit.in_range.values[k][0] && 
     return_value <= test.unit.in_range.values[k][1]
    ) {
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({
     id: 'inRangeErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.in_range.values)
    });
   }
  }

  if(test.unit.in_range.index_exact === true) { 
   if(
    return_value < test.unit.in_range.values[j][0] || 
    return_value > test.unit.in_range.values[j][1]
   ) { 
    return format({
     id: 'inRangeErrorOne', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.in_range.values[j])
    }); 
   }
  }

 }

 return 'PASSED';

}

module.exports = test;