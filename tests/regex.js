var type_test = require('./helpers/typeTest');
var format = require('./helpers/stringFormatters');

/**
 * makes sure the return value passes one or all regular expressions test.unit.must_pass_regex.values (array)
 * 
 * @param {object} test The object containing the function which was just tested
 * @param {Number} return_value The return value from the function which was just tested
 * @param {Number} i the index of the function
 * @param {Number} j the parameter index that was just executed
*/

function test(test, return_value, i, j) { 

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
   var es = '';
   for(let k = 0; k < test.unit.must_pass_regex.values.length; k++) { 
    if(testrg(test.unit.must_pass_regex.values[k], return_value) !== true) { 
     es += format({
      id: 'regexErrorAll', 
      return_value: typeof(return_value) === 'object' ? JSON.stringify(return_value) : return_value, 
      compared_to: test.unit.must_pass_regex.values[k], 
      index: k
     });
    }
   }
   if(es.trim().length > 0) { 
    return es;
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

function testrg(regular_expression, return_value) { 
 try {
  return regular_expression.test(return_value);
 } catch(err) { 
  return false;
 } 
}

module.exports = test;