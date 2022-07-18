var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.allowed_values, 
  test.unit.allowed_values.on, 
  test.unit.allowed_values.values, 
  test.unit.allowed_values.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.allowed_values) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.allowed_values.on === true) {

  if(return_value === null || typeof(return_value) !== 'object') {

   if(
    test.unit.allowed_values.index_exact === false && 
    test.unit.allowed_values.values.includes(return_value) !== true
   ) { 
    return format({
     id: 'valueErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.allowed_values.values)
    }); 
   }

   if(
    test.unit.allowed_values.index_exact === true && 
    test.unit.allowed_values.values[j] !== return_value
   ) { 
    return format({
     id: 'valueErrorOne', 
     return_value: return_value, 
     compared_to: typeof(test.unit.allowed_values.values[j]) === 'object' ? 
     JSON.stringify(test.unit.allowed_values.values[j]) : 
     test.unit.allowed_values.values[j]
    }); 
   }

  } 

  if(typeof(return_value) === 'object') { 

   if(test.unit.allowed_values.index_exact === false) {
    var found = false;
    for(let k = 0; k < test.unit.allowed_values.values.length; k++) { 
     if(typeof(test.unit.allowed_values.values[k]) === 'object') { 
      if(JSON.stringify(test.unit.allowed_values.values[k]) === JSON.stringify(return_value)) { //change this
       found = true;
       break;
      }
     }
    }
    if(found === false) { 
     return format({
      id: 'valueErrorAllObject', 
      return_value: JSON.stringify(return_value), 
      compared_to: JSON.stringify(test.unit.allowed_values.values)
     });
    }
   }

   if(
    test.unit.allowed_values.index_exact === true && 
    JSON.stringify(test.unit.allowed_values.values[j]) !== JSON.stringify(return_value) //change this
   ) { 
    return format({
     id: 'valueErrorOneObject', 
     return_value: JSON.stringify(return_value), 
     compared_to: typeof(test.unit.allowed_values.values[j]) === 'object' ? 
     JSON.stringify(test.unit.allowed_values.values[j]) : 
     test.unit.allowed_values.values[j]
    });
   }

  }

 }

 return 'PASSED';

}

module.exports = test;