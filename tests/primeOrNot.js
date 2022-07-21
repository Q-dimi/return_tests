var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value is prime in at least one of test.unit.must_be_prime_or_not_prime
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) {

 if(!type_test(
  test.unit.must_be_prime_or_not_prime, 
  test.unit.must_be_prime_or_not_prime.on, 
  test.unit.must_be_prime_or_not_prime.values, 
  test.unit.must_be_prime_or_not_prime.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_prime_or_not_prime) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_prime_or_not_prime.on === true) { 

  var prime = null;

  if(
   return_value < 2 || 
   return_value % 1 !== 0
  ) { 
   prime = false;
  }

  if(return_value === 2) { 
   prime = true;
  }

  if(
   return_value > 2 && 
   return_value % 1 === 0
  ) { 
   for(let k = 2; k < return_value; k++) {
    if(return_value % k === 0) { 
     prime = false;
     break;
    }
    if(k + k > return_value) { 
     break;
    }
   }
   if(prime === null) { 
    prime = true;
   }
  }
 
  if(test.unit.must_be_prime_or_not_prime.index_exact === false) { 
   var found = false; 
   for(let k = 0; k < test.unit.must_be_prime_or_not_prime.values.length; k++) { 
    if(
     prime === true && test.unit.must_be_prime_or_not_prime.values[k] === 'prime' ||
     prime === false && test.unit.must_be_prime_or_not_prime.values[k] === 'not prime'
    ) { 
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({ 
     id: 'primeErrorAll', 
     return_value: return_value, 
     isPrime: prime === true ? 'prime number' : 'non prime number' ,
     compared_to: JSON.stringify(test.unit.must_be_prime_or_not_prime.values)
    })
   }
  }

  if(test.unit.must_be_prime_or_not_prime.index_exact === true) { 
   if(
    prime === true && test.unit.must_be_prime_or_not_prime.values[j] === 'not prime' ||
    prime === false && test.unit.must_be_prime_or_not_prime.values[j] === 'prime'
   ) { 
    return format({ 
     id: 'primeErrorOne', 
     return_value: return_value, 
     isPrime: prime === true ? 'prime number' : 'non prime number',
     compared_to: test.unit.must_be_prime_or_not_prime.values[j]
    })
   }
  }

 }

 return 'PASSED';

}

module.exports = test;