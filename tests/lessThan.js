var type_test = require('./helpers/typeTest');
function test(test, return_value, i, j) { 
 if(!type_test(
  test.unit.is_less_than, 
  test.unit.is_less_than.on, 
  test.unit.is_less_than.values, 
  test.unit.is_less_than.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.is_less_than) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 
 if(test.unit.is_less_than.on === true) { 
  if(test.unit.is_less_than.index_exact === false) { 
   var found = false;
   for(let k = 0; k < test.unit.is_less_than.values.length; k++) { 
    if(return_value < test.unit.is_less_than.values[k]) {
     found = true;
     break;
    }
   }
   if(found === false) { 
    return `lessThanError: '${return_value}' is more than all of the values in the array '${JSON.stringify(test.unit.is_less_than.values)}'\n`;
   } 
  }
  if(test.unit.is_less_than.index_exact === true) { 
   if(return_value > test.unit.is_less_than.values[j]) { 
    return `lessThanError: '${return_value}' is more than '${test.unit.is_less_than.values[j]}'\n`;
   }
  }
 }
 return 'PASSED';
}
module.exports = test;