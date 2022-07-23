/*
 turning deep objects into an array and comparing.
 recursing on objects and arrays
*/ 

var components = [];

function compare(av, rv) { 

 if(
  typeof(av) !== 'object' || 
  typeof(rv) !== 'object'
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
  if(compare_av[i] != compare_rv[i]) {
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
   components.push(key);
   push_proto(key, 'object', obj[key]);
   deep_check_object(obj[key], Object.keys(obj[key]));
  }

  else if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === true
  ) {
   components.push(key);
   push_proto(key, 'array', obj[key]);
   deep_array_check(key, obj[key]);
  }

  else { 
   components.push(key);
   components.push(typeof(obj[key]) === 'function' ? `${obj[key]}`.replace(/\s+/g, '').toLowerCase() : `${obj[key]}`);
   push_proto(key, 'single', obj[key]);
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
   components.push(key);
   push_proto(key, 'object', arr[i]);
   deep_check_object(arr[i], Object.keys(arr[i]));
  }

  else if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === true
  ) {
   components.push(key);
   push_proto(key, 'array', arr[i]);
   deep_array_check(key, arr[i]);
  }

  else { 
   components.push(key);
   components.push(typeof(arr[i]) === 'function' ? `${arr[i]}`.replace(/\s+/g, '').toLowerCase() : `${arr[i]}`);
   push_proto(key, 'single', arr[i]);
  }

 }

} 

function push_proto(k, t, v) {
 return;
}

module.exports = compare;