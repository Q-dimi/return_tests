var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value matches at least one of test.unit.must_be_value.values (array)
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.must_be_value, 
  test.unit.must_be_value.on, 
  test.unit.must_be_value.values, 
  test.unit.must_be_value.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_value) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_value.on === true) {

  if(return_value === null || typeof(return_value) !== 'object') {

   if(
    test.unit.must_be_value.index_exact === false && 
    test.unit.must_be_value.values.includes(return_value) !== true
   ) { 
    return format({
     id: 'valueErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_value.values)
    }); 
   }

   if(
    test.unit.must_be_value.index_exact === true && 
    test.unit.must_be_value.values[j] !== return_value
   ) { 
    return format({
     id: 'valueErrorOne', 
     return_value: return_value, 
     compared_to: typeof(test.unit.must_be_value.values[j]) === 'object' ? 
     JSON.stringify(test.unit.must_be_value.values[j]) : 
     test.unit.must_be_value.values[j]
    }); 
   }

  } 

  if(typeof(return_value) === 'object') { 

   if(test.unit.must_be_value.index_exact === false) {
    var found = false;
    for(let k = 0; k < test.unit.must_be_value.values.length; k++) { 
     if(typeof(test.unit.must_be_value.values[k]) === 'object') { 
      if(JSON.stringify(test.unit.must_be_value.values[k]) === JSON.stringify(return_value)) { //change this
       found = true;
       break;
      }
     }
    }
    if(found === false) { 
     return format({
      id: 'valueErrorAllObject', 
      return_value: JSON.stringify(return_value), 
      compared_to: JSON.stringify(test.unit.must_be_value.values)
     });
    }
   }

   if(
    test.unit.must_be_value.index_exact === true && 
    JSON.stringify(test.unit.must_be_value.values[j]) !== JSON.stringify(return_value) //change this
   ) { 
    return format({
     id: 'valueErrorOneObject', 
     return_value: JSON.stringify(return_value), 
     compared_to: typeof(test.unit.must_be_value.values[j]) === 'object' ? 
     JSON.stringify(test.unit.must_be_value.values[j]) : 
     test.unit.must_be_value.values[j]
    });
   }

  }

 }

 return 'PASSED';

}

module.exports = test;