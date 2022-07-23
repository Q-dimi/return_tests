/*
 turning deep objects into arrays and comparing.
 recursing on objects and arrays
 pushing key, type and value
 'compressing functions' 
 key sets for building back up..if iterating over you should be able to build the object back up
 components are the definitions (with the key set)
 will add to it..

 output...

[
  '{ key_set: "[]", key: "a", type: "number", value: "3" }',
  '{ key_set: "[b]", key: "b", type: "object", value: "[object Object]" }',    
  '{ key_set: "[b]", key: "d", type: "number", value: "4" }',
  '{ key_set: "[b]", key: "h", type: "number", value: "55" }',
  '{ key_set: "[b]", key: "l", type: "string", value: "string" }',
  '{ key_set: "[b,v,c]", key: "c", type: "object", value: "[object Object]" }',
  '{ key_set: "[b,v,c]", key: "d", type: "number", value: "5" }',
]

*/ 

var components = [];
var key_set = [];

function compare(av, rv) { 

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

 const compare_av = deep_check_object(av, avkeys); components = [];
 const compare_rv = deep_check_object(rv, rvkeys); components = [];

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
   `${obj[key]}` === "[object Object]" ?  key_set.push(key) : '';
   components.push(`{ key_set: "[${key_set}]", key: "${key}", type: "${typeof(obj[key])}", value: "${obj[key]}" }`);
   deep_check_object(obj[key], Object.keys(obj[key]));
  }

  else if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === true
  ) {
   components.push(`{ key_set: "[${key_set}]", key: "${key}", type: "${typeof(obj[key])}, value: ${obj[key]}" }`);
   deep_check_array(key, obj[key]);
  }

  else { 
    components.push(`{ key_set: "[${key_set}]", key: "${key}", type: "${typeof(obj[key])}", value: "${typeof(obj[key]) === 'function' ? `${obj[key]}`.replace(/\s+/g, '').toLowerCase() : `${obj[key]}`}" }`);
  }

 });

 key_set = [];

 return components;

}

function deep_check_array(key, arr) { 

 for(let i = 0; i < arr.length; i++) { 

  if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === false && 
   arr[i] !== null
  ) { 
   `${obj[key]}` === "[object Object]" ?  key_set.push(key) : '';
   components.push(`{ key_set: "[${key_set}]", key: "${key}", type: "${typeof(arr[i])}", value: "${arr[i]}" }`);
   deep_check_object(arr[i], Object.keys(arr[i]));
  }

  else if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === true
  ) {
   components.push(`{ key_set: "[${key_set}]", key: "${key}", type: "${typeof(arr[i])}", value: "${arr[i]}" }`);
   deep_check_array(key, arr[i]);
  }

  else { 
   components.push(`{ key_set: "[${key_set}]", key: "${key}", type: "${typeof(arr[i])}, value: ${typeof(arr[i]) === 'function' ? `${arr[i]}`.replace(/\s+/g, '').toLowerCase() : `${arr[i]}`}" }`);
  }

 }

} 

module.exports = compare;