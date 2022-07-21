var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value matches either all or one of the even or odd values in test.unit.must_be_even_or_odd.values (array)
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) {

 if(!type_test(
  test.unit.must_be_even_or_odd, 
  test.unit.must_be_even_or_odd.on, 
  test.unit.must_be_even_or_odd.values, 
  test.unit.must_be_even_or_odd.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_even_or_odd) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_even_or_odd.on === true) { 

  if(test.unit.must_be_even_or_odd.index_exact === false) { 
   var found = false; 
   for(let k = 0; k < test.unit.must_be_even_or_odd.values.length; k++) { 
    if(
     (return_value % 2 === 0 && test.unit.must_be_even_or_odd.values[k] === 'even') ||
     (return_value % 2 !== 0 && test.unit.must_be_even_or_odd.values[k] === 'odd')
    ) { 
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({ 
     id: 'evenOrOddErrorAll',
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_even_or_odd.values)
    });
   }
  }

  if(test.unit.must_be_even_or_odd.index_exact === true) { 
   if(
    return_value % 2 === 0 && test.unit.must_be_even_or_odd.values[j] !== 'even' ||
    return_value % 2 !== 0 && test.unit.must_be_even_or_odd.values[j] !== 'odd'
   ) { 
    return format({ 
     id: 'evenOrOddErrorOne', 
     return_value: return_value, 
     compared_to: test.unit.must_be_even_or_odd.values[j]
    });
   }
  }

 }

 return 'PASSED';

}

module.exports = test;