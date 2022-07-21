var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value is divisible by one or all the values in test.unit.must_be_divisible_by.values
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) {

 if(!type_test(
  test.unit.must_be_divisible_by, 
  test.unit.must_be_divisible_by.on, 
  test.unit.must_be_divisible_by.values, 
  test.unit.must_be_divisible_by.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_divisible_by) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_divisible_by.on === true) { 

  if(test.unit.must_be_divisible_by.index_exact === false) { 
   var found = false; 
   for(let k = 0; k < test.unit.must_be_divisible_by.values.length; k++) { 
    if(return_value % test.unit.must_be_divisible_by.values[k] === 0) { 
     found = true;
    }
   }
   if(found === false) { 
    return format({ 
     id: 'divisibleByErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_divisible_by.values)
    });
   }
  }

  if(test.unit.must_be_divisible_by.index_exact === true) { 
   if(return_value % test.unit.must_be_divisible_by.values[j] !== 0) { 
    return format({ 
     id: 'divisibleByErrorOne', 
     return_value: return_value, 
     compared_to: test.unit.must_be_divisible_by.values[j]
    });
   }
  }

 }

 return 'PASSED';

}

module.exports = test;