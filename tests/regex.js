var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

function test(test, return_value, i, j) { 

 if(!type_test(
  test.unit.regex_set, 
  test.unit.regex_set.on, 
  test.unit.regex_set.values, 
  test.unit.regex_set.index_exact
 )) { 
  throw new Error(`
   function index: ${i}\n
   error: (unit.regex_set) must be an object 
   with parameters (on: boolean) (values: array) 
   (index_exact: boolean)`
  );
 } 

 if(test.unit.regex_set.on === true) {

  if(test.unit.regex_set.index_exact === false) {
   var es = '';
   for(let k = 0; k < test.unit.regex_set.values.length; k++) { 
    if(testrg(test.unit.regex_set.values[k], return_value) !== true) { 
     es += format({
      id: 'regexErrorAll', 
      return_value: typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value, 
      compared_to: test.unit.regex_set.values[k], 
      index: k
     });
    }
   }
   if(es.trim().length > 0) { 
    return es;
   } 
  }

  if(test.unit.regex_set.index_exact === true) { 
   if(testrg(test.unit.regex_set.values[j], return_value) !== true) { 
    return format({
     id: 'regexErrorOne', 
     return_value: typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value, 
     compared_to: test.unit.regex_set.values[j], 
    });
   }
  }
  
 }

 return 'PASSED';

}

function testrg(regular_expression, return_value) { 
 try {
  return regular_expression.test(return_value);
 } catch(err) { 
  return false;
 } 
}

module.exports = test;