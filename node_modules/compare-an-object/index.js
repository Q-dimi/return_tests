/*
 turning deep objects into arrays and comparing.
 recursing on objects and arrays
 pushing path, key, type and value
 for should_pop, making sure I am in an object when popping so I can compare in n^2
 feedback: johneatman446@gmail.com
 please send an email if anything wrong/missing
*/ 

var components = [];
var key_set = [];

function compare(av, rv) { 

 components = [];
 key_set = [];

 if(
  typeof(av) !== 'object' || 
  typeof(rv) !== 'object'
 ) { 
  return false;
 }

 if(
  av === null || 
  rv === null
 ) { 
  return false;
 }

 if(
  `${av}` === "[object WeakMap]" || 
  `${av}` === "[object WeakSet]" ||
  `${rv}` === "[object WeakMap]" ||
  `${rv}` === "[object WeakSet]"
 ) { 
  throw new Error('input must not be weakmap or weakset');
 }

 if(`${av}` === "[object Map]") { 
  av = Object.fromEntries(av);
 } else if(`${av}` === "[object Set]") { 
  av = Array.from(av);
 }

 if(`${rv}` === "[object Map]") { 
  rv = Object.fromEntries(rv);
 } else if(`${rv}` === "[object Set]") { 
  rv = Array.from(rv);
 }

 if(
  (Array.isArray(av) === true && Array.isArray(rv) === false) || 
  (Array.isArray(av) === false && Array.isArray(rv) === true)
 ) { 
  return false;
 } 

 if(
  Array.isArray(av) === true &&
  Array.isArray(rv) === true
 ) { 
  av = { 
   array: av
  }
  rv = { 
   array: rv
  }
 }

 var avkeys = Object.keys(av);
 var rvkeys = Object.keys(rv);

 if(avkeys.length !== rvkeys.length) { 
  return false;
 }

 const compare_av = deep_check_object(av, avkeys, true); components = []; key_set = [];
 const compare_rv = deep_check_object(rv, rvkeys, true); components = []; key_set = [];

 if(compare_av.length !== compare_rv.length) { 
  return false; 
 }

 for(let i = 0; i < compare_av.length; i++) { 
  var i_found = false;
  for(let j = 0; j < compare_av.length; j++) { 
   if(compare_av[i] === compare_rv[j]) { 
    i_found = true;
    break;
   }
  }
  if(i_found === false) { 
   return false;
  }
 }

 return true;

}

function deep_check_object(obj, keys, should_pop) { 

 if(
  `${obj}` === "[object WeakMap]" || 
  `${obj}` === "[object WeakSet]"
 ) { 
   throw new Error('object must not contain weakmap or weakset');
 }

 keys.forEach((key, index) => {

  if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === false && 
   obj[key] !== null && 
   `${obj[key]}` !== "[object Set]"
  ) {

   if(`${obj[key]}` === "[object Map]") { 
    obj[key] = Object.fromEntries(obj[key]);
   }

   if(`${obj[key]}` === "[object Object]"){
    key_set.push(`(${key},object)`);
   }

   components.push(format_string(
    key_set, 
    key, 
    typeof(obj[key]),
    obj[key]
   ));

   deep_check_object(
    obj[key], 
    Object.keys(obj[key]), 
    `${obj[key]}` === "[object Object]" ? true : false
   );

  } else if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === true || 
   `${obj[key]}` === "[object Set]"
  ) {

   if(`${obj[key]}` === "[object Set]") { 
    obj[key] = Array.from(obj[key]);
   }

   key_set.push(`(${key},array)`);

   components.push(format_string(
    key_set, 
    key, 
    'array', 
    obj[key]
   ));

   deep_check_array(
    key, 
    obj[key], 
    true
   );

  } else { 

   components.push(format_string(
    key_set, 
    key, 
    typeof(obj[key]), 
    typeof(obj[key]) === 'function' ? `${obj[key]}`.replace(/\s+/g, '').toLowerCase() : obj[key]
   ));

  }

 });
 
 if(should_pop === true) {
  key_set.pop();
 }
 
 return components;

}

function deep_check_array(key, arr, should_pop) { 
 
 for(let i = 0; i < arr.length; i++) { 

  if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === false && 
   arr[i] !== null && 
   `${arr[i]}` !== "[object Set]"
  ) { 

   if(`${arr[i]}` === "[object Map]") { 
    arr[i] = Object.fromEntries(arr[i]);
   }

   components.push(format_string(
    key_set, 
    key, 
    typeof(arr[i]), 
    arr[i],
    i
   ));

   deep_check_object(
    arr[i], 
    Object.keys(arr[i]), 
    false
   );

  } else if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === true ||
   `${arr[i]}` === "[object Set]"
  ) {

   if(`${arr[i]}` === "[object Set]") { 
    arr[i] = Array.from(arr[i]);
   }

  components.push(format_string( 
   key_set, 
   key, 
   'array', 
   arr[i],
   i
  ));

  deep_check_array(
   key, 
   arr[i], 
   false
  );

  } else { 

   components.push(format_string( 
    key_set, 
    key, 
    typeof(arr[i]), 
    typeof(arr[i]) === 'function' ? `${arr[i]}`.replace(/\s+/g, '').toLowerCase() : arr[i],
    i
   ));

  }

 }

 if(should_pop === true) { 
  key_set.pop();
 }

} 

function format_string(key_set, key, type, value, index) { 
 return `{ path: "[${key_set}]", key: "${key}", type: "${type}", value: "${value}", index: "${typeof(index) !== 'undefined' ? index : -1}" }`;
}

module.exports = compare;