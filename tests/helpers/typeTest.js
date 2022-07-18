function type_test(a, b, c, d) { 
 if(
  typeof(a) !== 'object' || 
  typeof(b) !== 'boolean' || 
  (typeof(c) !== 'object' || Array.isArray(c) === false) || 
  typeof(d) !== 'boolean'
 ) {
   return false;
  } else { 
   return true;
 }
}

module.exports = type_test;
