var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value is less than one or all of test.unit.must_be_less_than.values (array)
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) { 
    
 if(!type_test(
  test.unit.must_be_less_than, 
  test.unit.must_be_less_than.on, 
  test.unit.must_be_less_than.values, 
  test.unit.must_be_less_than.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_less_than) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_less_than.on === true) { 

  if(test.unit.must_be_less_than.index_exact === false) { 
   var found = false;
   for(let k = 0; k < test.unit.must_be_less_than.values.length; k++) { 
    if(return_value < test.unit.must_be_less_than.values[k]) {
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({
     id: 'lessThanErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_less_than.values)
    });
   } 
  }

  if(test.unit.must_be_less_than.index_exact === true) { 
   if(return_value > test.unit.must_be_less_than.values[j]) { 
    return format({
     id: 'lessThanErrorOne', 
     return_value: return_value, 
     compared_to: test.unit.must_be_less_than.values[j]
    });
   }
  }

 }

 return 'PASSED';

}

module.exports = test;