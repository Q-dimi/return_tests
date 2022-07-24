/*
 turning deep objects into arrays and comparing.
 recursing on objects and arrays
 pushing key, type and value
 will use lib function if i find an error...
 for should_pop, im
 making sure I am in an object AND at the end of an object OR 
 in an object and at the end of an array 
 and popping so the last reference matches the current value.
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
 
 keys.forEach((key, index) => {

  if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === false && 
   obj[key] !== null
  ) {
   key_set.push(key);
   components.push(`{ [${key_set}] key: "${key}", type: "${typeof(obj[key])}", value: "${obj[key]}" }`);
   deep_check_object(obj[key], Object.keys(obj[key]), true);
  }

  else if(
   typeof(obj[key]) === 'object' && 
   Array.isArray(obj[key]) === true
  ) {
   key_set.push(key);
   components.push(`{ [${key_set}] key: "${key}", type: "array", value: "${obj[key]}" }`);
   deep_check_array(key, obj[key], true);
  }

  else { 
   components.push(`{ [${key_set}] key: "${key}", type: "${typeof(obj[key])}", value: "${typeof(obj[key]) === 'function' ? `${obj[key]}`.replace(/\s+/g, '').toLowerCase() : `${obj[key]}`}" }`);
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
   arr[i] !== null
  ) { 
   components.push(`{ [${key_set}] key: "${key}", type: "${typeof(arr[i])}", value: "${arr[i]}" }`);
   deep_check_object(arr[i], Object.keys(arr[i]), false);
  }

  else if(
   typeof(arr[i]) === 'object' && 
   Array.isArray(arr[i]) === true
  ) {
   components.push(`{ [${key_set}] key: "${key}", type: "array", value: "${arr[i]}" }`);
   deep_check_array(key, arr[i], false);
  }

  else { 
   components.push(`{ [${key_set}] key: "${key}", type: "${typeof(arr[i])}", value: "${typeof(arr[i]) === 'function' ? `${arr[i]}`.replace(/\s+/g, '').toLowerCase() : `${arr[i]}`}" }`);
  }

 }

 if(should_pop === true) { 
  key_set.pop();
 }

} 

module.exports = compare;