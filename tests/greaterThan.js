var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.is_greater_than, 
  test.unit.is_greater_than.on, 
  test.unit.is_greater_than.values, 
  test.unit.is_greater_than.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.is_greater_than) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
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
    return format({
     id: 'greaterThanErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.is_greater_than.values)
    });
   } 
  }

  if(test.unit.is_greater_than.index_exact === true) { 
   if(return_value < test.unit.is_greater_than.values[j]) { 
    return format({
     id: 'greaterThanErrorOne', 
     return_value: return_value, 
     compared_to: test.unit.is_greater_than.values[j]
    });
   }
  }

 }

 return 'PASSED';

}

module.exports = test;