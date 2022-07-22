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
      if(JSON.stringify(test.unit.must_be_value.values[k]) === JSON.stringify(return_value)) { //will change
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
    JSON.stringify(test.unit.must_be_value.values[j]) !== JSON.stringify(return_value)
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

//this is my own probably not so good function for deep checking. i will probably use a library but worth a shot... have not run yet

var components = [];

function compare(av, rv) { 

 if(
  typeof(av) !== 'object' || 
  typeof(rv) !== 'object'
 ) { 
  return false;
 }

 if(
  av === null || 
  Array.isArray(av) === true
 ) { 
  return false;
 }

 if(
  rv === null || 
  Array.isArray(rv) === true
 ) { 
  return false;
 }

 if(av === rv) { 
  return true;
 }

 var avkeys = Object.keys(av);
 var rvkeys = Object.keys(rv);

 if(avkeys.length !== rvkeys.length) { 
  return false;
 }

 const compare_av = deep_check_object(av, avkeys); components = [];
 const compare_rv = deep_check_object(rv, rvkeys);

 if(compare_av.length !== compare_rv.length) { 
  return false; 
 }

 for(let i = 0; i < compare_av.length; i++) { 
  if(compare_av[i] !== compare_rv[i]) { 
   return false;
  }
 }

 return true;

}

function deep_check_object(obj, keys) { 

 keys.forEach((key, index) => {

  if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === false && 
   obj[key] !== null
  ) {
   components.push(`${key}-object-${obj[key]}`);
   deep_check_object(obj[key], Object.keys(obj[key]));
  }

  else if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === true
  ) {
   components.push(`${key}-array-${obj[key]}`);
   deep_array_check(key, obj[key]);
  }

  else { 
   components.push(`${key}-single-${obj[key]}`);
  }

 });

 return components;

}

function deep_array_check(key, arr) { 

 for(let i = 0; i < arr.length; i++) { 

  if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === false && 
   arr[i] !== null
  ) { 
   components.push(`${key}-object-${arr[i]}`);
   deep_check_object(arr[i], Object.keys(arr[i]));
  }

  else if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === true
  ) {
   components.push(`${key}-array-${arr[i]}`);
   deep_array_check(key, arr[i]);
  }

  else { 
   components.push(`${key}-single-${arr[i]}`);
  }

 }

} 

module.exports = test;