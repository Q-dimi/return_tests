module.exports = [ 
{
index: '1',
function_called: {
on: true,
description: 'filepath is tests\greaterThan.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.must_be_greater_than, 
  test.unit.must_be_greater_than.on, 
  test.unit.must_be_greater_than.values, 
  test.unit.must_be_greater_than.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_greater_than) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_greater_than.on === true) { 

  if(test.unit.must_be_greater_than.index_exact === false) { 
   var found = false;
   for(let k = 0; k < test.unit.must_be_greater_than.values.length; k++) { 
    if(return_value > test.unit.must_be_greater_than.values[k]) {
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({
     id: 'greaterThanErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_greater_than.values)
    });
   } 
  }

  if(test.unit.must_be_greater_than.index_exact === true) { 
   if(return_value < test.unit.must_be_greater_than.values[j]) { 
    return format({
     id: 'greaterThanErrorOne', 
     return_value: return_value, 
     compared_to: test.unit.must_be_greater_than.values[j]
    });
   }
  }

 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '2',
function_called: {
on: true,
description: 'filepath is tests\inRange.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.must_be_in_range, 
  test.unit.must_be_in_range.on, 
  test.unit.must_be_in_range.values, 
  test.unit.must_be_in_range.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_in_range) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_in_range.on === true) { 

  if(test.unit.must_be_in_range.index_exact === false) { 
   var found = false; 
   for(let k = 0; k < test.unit.must_be_in_range.values.length; k++) { 
    if(
     return_value >= test.unit.must_be_in_range.values[k][0] && 
     return_value <= test.unit.must_be_in_range.values[k][1]
    ) {
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({
     id: 'inRangeErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_in_range.values)
    });
   }
  }

  if(test.unit.must_be_in_range.index_exact === true) { 
   if(
    return_value < test.unit.must_be_in_range.values[j][0] || 
    return_value > test.unit.must_be_in_range.values[j][1]
   ) { 
    return format({
     id: 'inRangeErrorOne', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_in_range.values[j])
    }); 
   }
  }

 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '3',
function_called: {
on: true,
description: 'filepath is tests\isDivisibleBy.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) {

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
     break;
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
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '4',
function_called: {
on: true,
description: 'filepath is tests\isEvenOrOdd.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) {

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
    return_value % 2 === 0 && test.unit.must_be_even_or_odd.values[j] === 'odd' ||
    return_value % 2 !== 0 && test.unit.must_be_even_or_odd.values[j] === 'even'
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
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '5',
function_called: {
on: true,
description: 'filepath is tests\lessThan.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) { 
    
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
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '6',
function_called: {
on: true,
description: 'filepath is tests\logOf.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.must_be_log_of, 
  test.unit.must_be_log_of.on, 
  test.unit.must_be_log_of.values, 
  test.unit.must_be_log_of.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_log_of) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_log_of.on === true) { 

  if(test.unit.must_be_log_of.index_exact === false) { 
   var found = false;
   for(let k = 0; k < test.unit.must_be_log_of.values.length; k++) { 
    if(test.unit.must_be_log_of.values[k][0]**return_value === test.unit.must_be_log_of.values[k][1]) { 
     found = true;
     break;
    }
   }
   if(found === false) { 
    return format({
     id: 'logOfErrorAll', 
     return_value: return_value, 
     compared_to: JSON.stringify(test.unit.must_be_log_of.values)
    });
   } 
  }

  if(test.unit.must_be_log_of.index_exact === true) { 
   if(test.unit.must_be_log_of.values[j][0]**return_value !== test.unit.must_be_log_of.values[j][1]) { 
    return format({
     id: 'logOfErrorOne', 
     return_value: return_value, 
     compared_to_base: test.unit.must_be_log_of.values[j][0],
     compared_to_value: test.unit.must_be_log_of.values[j][1]
    });
   }
  }

 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '7',
function_called: {
on: true,
description: 'filepath is tests\primeOrNot.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) {

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

  else if(return_value === 2) { 
   prime = true;
  }

  else if(
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
    });
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
    });
   }
  }

 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '8',
function_called: {
on: true,
description: 'filepath is tests\regex.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.must_pass_regex, 
  test.unit.must_pass_regex.on, 
  test.unit.must_pass_regex.values, 
  test.unit.must_pass_regex.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_pass_regex) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_pass_regex.on === true) {

  if(test.unit.must_pass_regex.index_exact === false) {
   var found = false; 
   for(let k = 0; k < test.unit.must_pass_regex.values.length; k++) { 
    if(testrg(test.unit.must_pass_regex.values[k], return_value) === true) { 
     found = true; 
     break;
    }
   }
   if(found === false) { 
    return format({
     id: 'regexErrorAll', 
     return_value: typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value, 
     compared_to: test.unit.must_pass_regex.values, 
    });
   } 
  }

  if(test.unit.must_pass_regex.index_exact === true) { 
   if(testrg(test.unit.must_pass_regex.values[j], return_value) !== true) { 
    return format({
     id: 'regexErrorOne', 
     return_value: typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value, 
     compared_to: test.unit.must_pass_regex.values[j], 
    });
   }
  }
  
 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '9',
function_called: {
on: true,
description: 'filepath is tests\regex.js AND line number is 64',
parameters: [], 
function: function testrg(regular_expression, return_value) { 
 try {
  return regular_expression.test(return_value);
 } catch(err) { 
  return false;
 } 
}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '10',
function_called: {
on: true,
description: 'filepath is tests\type.js AND line number is 13',
parameters: [], 
function: function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.must_be_type, 
  test.unit.must_be_type.on, 
  test.unit.must_be_type.values, 
  test.unit.must_be_type.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.must_be_type) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.must_be_type.on === true) {

  if(
   test.unit.must_be_type.index_exact === false && 
   test.unit.must_be_type.values.includes(typeof(return_value)) !== true
  ) {
   return format({
    id: 'typeErrorAll', 
    return_value: typeof(return_value), 
    compared_to: JSON.stringify(test.unit.must_be_type.values)
   }); 
  }

  if(
   test.unit.must_be_type.index_exact === true && 
   test.unit.must_be_type.values[j] !== typeof(return_value)
  ) { 
   return format({
    id: 'typeErrorOne', 
    return_value: typeof(return_value), 
    compared_to: test.unit.must_be_type.values[j]
   }); 
  }

 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '11',
function_called: {
on: true,
description: 'filepath is tests\value.js AND line number is 14',
parameters: [], 
function: function test(test, return_value, i, j) { 

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

  if(
    return_value === null || 
    typeof(return_value) !== 'object'
   ) {

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
      if(c(test.unit.must_be_value.values[k], return_value).same === true) {
       found = true;
       break;
      }
     }
    }
    if(found === false) { 
     return format({
      id: 'valueErrorAllObject', 
      return_value: JSON.stringify(return_value), 
      compared_to: JSON.stringify(test.unit.must_be_value.values),
     });
    }
   }

   if(test.unit.must_be_value.index_exact === true) { 
    if(c(test.unit.must_be_value.values[j], return_value).same === false) {
     return format({
      id: 'valueErrorOneObject', 
      return_value: JSON.stringify(return_value), 
      compared_to: typeof(test.unit.must_be_value.values[j]) === 'object' ? 
      JSON.stringify(test.unit.must_be_value.values[j]) : 
      test.unit.must_be_value.values[j], 
     });
    }
   }

  }

 }

 return 'PASSED';

}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},


{
index: '12',
function_called: {
on: true,
description: 'filepath is tests\value.js AND line number is 104',
parameters: [], 
function: function c(av, rv) { 
 var o = {};
 try { 
  o = compare(av, rv);
 } catch(err) { 
  o.same = false;
 }
 return o;
}
},
unit: {
must_be_value:{
 on: true,
 index_exact: true,
 values: []
},
},
},



 ];