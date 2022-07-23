/*
 turning deep objects into arrays and comparing.
 recursing on objects and arrays
 pushing key, type and value
 'compressing functions' 
 key sets for building back up..if iterating over you should be able to build the object back up
 components are the definitions (with the key set)
 will add to it..
 right when i put an object in the array key_set resets to []

 output...

[
  '{ key_set: "[]", key: "a", type: "number", value: "3", type_of: "single" }',
  '{ key_set: "[b]", key: "b", type: "object", value: "[object Object]", type_of: "object" }',        
  '{ key_set: "[b]", key: "d", type: "number", value: "4", type_of: "single" }',
  '{ key_set: "[b]", key: "h", type: "number", value: "55", type_of: "single" }',
  '{ key_set: "[b]", key: "l", type: "string", value: "string", type_of: "single" }',
  '{ key_set: "[b,v]", key: "v", type: "object", value: "[object Object]", type_of: "object" }',      
  '{ key_set: "[b,v]", key: "a", type: "number", value: "5", type_of: "single" }',
  '{ key_set: "[b,v]", key: "h", type: "object", value: 1,2,[object Object],4,5", type_of: "array" }',
  '{ key_set: "[b,v]", key: "h", type: "number, value: "1", type_of: "single" }',
  '{ key_set: "[b,v]", key: "h", type: "number, value: "2", type_of: "single" }',
  '{ key_set: "[b,v,h]", key: "h", type: "object", value: "[object Object]", type_of: "object" }',    
  '{ key_set: "[b,v,h]", key: "a", type: "number", value: "44", type_of: "single" }',
  '{ key_set: "[b,v,h,cs]", key: "cs", type: "object", value: "[object Object]", type_of: "object" }',
  '{ key_set: "[b,v,h,cs]", key: "a", type: "number", value: "3", type_of: "single" }',
  '{ key_set: "[]", key: "d", type: "number", value: "44", type_of: "single" }',
  '{ key_set: "[]", key: "e", type: "object", value: 1,2,3", type_of: "array" }',
  '{ key_set: "[]", key: "e", type: "number, value: "1", type_of: "single" }',
  '{ key_set: "[]", key: "e", type: "number, value: "2", type_of: "single" }',
  '{ key_set: "[]", key: "e", type: "number, value: "3", type_of: "single" }',
  '{ key_set: "[]", key: "h", type: "number, value: "4", type_of: "single" }',
  '{ key_set: "[]", key: "h", type: "number, value: "5", type_of: "single" }',
  '{ key_set: "[c]", key: "c", type: "object", value: "[object Object]", type_of: "object" }',
  '{ key_set: "[c]", key: "d", type: "number", value: "5", type_of: "single" }',
  '{ key_set: "[c]", key: "g", type: "number", value: "6", type_of: "single" }'
]


*/ 

var components = [];
var key_set = [];
var k_array = [];

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

 console.log(k_array);
 console.log('---------------------');

 console.log(compare_rv);

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
   `${obj[key]}` === "[object Object]" ? key_set.push(key) : '';
   components.push(`{ key: "${key}", type: "${typeof(obj[key])}", value: "${obj[key]}", type_of: "object" }`);
   deep_check_object(obj[key], Object.keys(obj[key]));
  }

  else if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === true
  ) {
   components.push(`{ key: "${key}", type: "${typeof(obj[key])}", value: ${obj[key]}", type_of: "array" }`);
   k_array.push(key_set);
   deep_check_array(key, obj[key]);
  }

  else { 
    components.push(`{ key: "${key}", type: "${typeof(obj[key])}", value: "${typeof(obj[key]) === 'function' ? `${obj[key]}`.replace(/\s+/g, '').toLowerCase() : `${obj[key]}`}", type_of: "single" }`);
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
   `${arr[i]}` === "[object Object]" ?  key_set.push(key) : '';
   components.push(`{ key: "${key}", type: "${typeof(arr[i])}", value: "${arr[i]}", type_of: "object" }`);
   deep_check_object(arr[i], Object.keys(arr[i]));
  }

  else if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === true
  ) {
   components.push(`{ key: "${key}", type: "${typeof(arr[i])}", value: "${arr[i]}", type_of: "array" }`);
   k_array.push(key_set);
   deep_check_array(key, arr[i]);
  }

  else { 
   components.push(`{ key: "${key}", type: "${typeof(arr[i])}, value: "${typeof(arr[i]) === 'function' ? `${arr[i]}`.replace(/\s+/g, '').toLowerCase() : `${arr[i]}`}", type_of: "single" }`);
  }

 }

} 

module.exports = compare;