var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.allowed_types, 
  test.unit.allowed_types.on, 
  test.unit.allowed_types.values, 
  test.unit.allowed_types.index_exact
  )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.allowed_types) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.allowed_types.on === true) {

  if(
   test.unit.allowed_types.index_exact === false && 
   test.unit.allowed_types.values.includes(typeof(return_value)) !== true
  ) {
   return format({
    id: 'typeErrorAll', 
    return_value: typeof(return_value), 
    compared_to: JSON.stringify(test.unit.allowed_types.values)
   }); 
  }

  if(
   test.unit.allowed_types.index_exact === true && 
   test.unit.allowed_types.values[j] !== typeof(return_value)
  ) { 
   return format({
    id: 'typeErrorAll', 
    return_value: typeof(return_value), 
    compared_to: test.unit.allowed_types.values[j]
   }); 
  }

 }

 return 'PASSED';

}

module.exports = test;