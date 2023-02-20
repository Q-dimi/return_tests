module.exports = [ 

  { 
    index: '1',
    function_called: {
    on: true,
    description: 'filepath is  AND line number is 67',
    parameters: [],
    function: functionfunction test(test, return_value, i, j) { 

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
     
     must_be_value: {
     on: true,
     index_exact: true,
     values: []
    },
    }, 
   },
 
 ];