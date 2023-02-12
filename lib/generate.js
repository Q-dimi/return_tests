var fs = require('file-system');

var function_in_string = [];
var function_string = false;
var in_function = false; //used for reading

var data_index = 0;
var data = '';
var exported_functions = 'module.exports = [ \n';
var in_quotation_string = [];
var in_string = false;
var opening_bracket = [];
var closing_bracket = [];
var build_string = '';
var unit_configuration = [];
var function_index = 1;
var fp = '';
var is_arrow = false;
var has_bracket = false;

var bt_arrow_parameter_string = [];
var bt_index = 0;
var in_bt_quotation_string = [];
var in_bt_string = false;
var opening_bt_parentheses = [];
var closing_bt_parentheses = [];

function generate(folders, file_to_generate, unit) {

 unit_configuration = unit;

 for(let i = 0; i < unit_configuration.length; i++) { //im suing for stocking if you want to keep following me in the nissan bro. Its kind of funny its the same type, year and make i have. Maybe ill look at those cameras at the alcohol place tomorrow. n, you're probably going to go to jail if you dont stop. im not kidding. im preparing my documents and im calling some people (if i have to). If anything happens its you whos responsible. if you like programming, thats great. there are many amazing female computer scientists out there to look up to. and you too bro. go get yours at w3schools.
  if(
   unit_configuration[i] !== 'must_be_value' &&
   unit_configuration[i] !== 'must_be_type' &&
   unit_configuration[i] !== 'must_pass_regex' &&
   unit_configuration[i] !== 'must_be_log_of' &&
   unit_configuration[i] !== 'must_be_greater_than' &&
   unit_configuration[i] !== 'must_be_less_than' &&
   unit_configuration[i] !== 'must_be_in_range' &&
   unit_configuration[i] !== 'must_be_even_or_odd' &&
   unit_configuration[i] !== 'must_be_divisible_by' &&
   unit_configuration[i] !== 'must_be_prime_or_not_prime' &&
   unit_configuration[i] !== 'must_be_log_of' 
  ) {
   throw new Error('unit array must only contain allowed unit tests');
  }
 }

 if(
  typeof(folders) !== 'object' || 
  Array.isArray(folders) == false
 ) { 
  throw new Error('an array was not passed');
 }

 for(let i = 0; i < folders.length; i++) {

  var errors = '';

  if(typeof(folders[i].folder) !== 'string') { 
   errors += 'folder: folder must be a string \n';
  }

  if(
   typeof(folders[i].files) !== 'string' && 
   (typeof(folders[i].files) !== 'object' ||
   Array.isArray(folders[i].files == false))
  ) { 
   errors += 'files: files must be a string or array \n';
  }

  if(
   typeof(folders[i].files) == 'string' && 
   folders[i].files !== 'all'
  ) {  
   errors += 'files: if files is a string, the keyword must be (all) for all files and folders \n';
  }

  if(typeof(file_to_generate) !== 'string') { 
    errors += 'file_to_generate: file to generate must be a string \n';
  }

  if(errors.trim().length > 0) { 
   errors += `index: ${i}`;
   throw new Error(errors);
  }

  fs.recurseSync(folders[i].folder, folders[i].files == 'all' ? null : folders[i].files, (filepath, relative, filename) => {

   if(filename) { 

    data = fs.readFileSync(filepath, 'utf8');

    function_in_string = [];
    function_string = false;
    in_function = false;

    data_index = 0;
    in_quotation_string = [];
    in_string = false;
    opening_bracket = []; 
    closing_bracket = [];
    build_string = '';
    fp = filepath;
    is_arrow = false;
    has_bracket = false;

    bt_arrow_parameter_string = [];
    bt_index = 0;
    in_bt_quotation_string = [];
    in_bt_string = false;
    opening_bt_parentheses = [];
    closing_bt_parentheses = [];

    iterate_through_file_text(data_index); 

   }

  })

 }

 exported_functions += '\n ];';
 var error = 'functions have successfully been copied';

 try {
  fs.writeFileSync(file_to_generate, exported_functions);
 } catch(err) { 
  error = error.message;
 }

 return error;

}

function iterate_through_file_text(data_index) {

 try { 
  var file_end = data.charAt(data_index);
 } catch(err) { 
  return;
 }

 if(
  data.charAt(data_index) === "'" || 
  data.charAt(data_index) === '`' || 
  data.charAt(data_index) === `'` && 
  in_function === false
 ) { 
  function_in_string.push(data.charAt(data_index)); 
  function_string = true;
 }

 if(
  function_in_string.length > 1 && 
  function_in_string[function_in_string.length - 1] === function_in_string[0] && 
  in_function === false
 ) { 
  function_in_string = [];
  function_string = false;
 }

 if(function_string === true && in_function === false) { //not in a function and in a string, ignore everything and move forward
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 if(
  data.charAt(data_index) === 'f' && 
  data.charAt(data_index+1) === 'u' &&
  data.charAt(data_index+2) === 'n' &&
  data.charAt(data_index+3) === 'c' &&
  data.charAt(data_index+4) === 't' &&
  data.charAt(data_index+5) === 'i' &&
  data.charAt(data_index+6) === 'o' &&
  data.charAt(data_index+7) === 'n'
 ) { 
  in_function = true;
  build_string += 'function';
  data_index = data_index + 8;
  is_arrow = false;
  return iterate_through_file_text(data_index);
 }

 if(
  data.charAt(data_index) === '=' &&
  data.charAt(data_index+1) === '>'
 ) {
  in_function = true;
  bt_arrow_parameter_string = [];
  bt_index = data_index - 1;
  in_bt_quotation_string = [];
  in_bt_string = false;
  opening_bt_parentheses = [];
  closing_bt_parentheses = [];
  is_arrow = true;
  back_track_parameters(bt_index);
  build_string = `${bt_arrow_parameter_string} =>`;
  data_index = data_index + 2;
  return iterate_through_file_text(data_index);
 }

 if(
  data.charAt(data_index) === "'" || 
  data.charAt(data_index) === '`' || 
  data.charAt(data_index) === `'` && 
  in_function === true
 ) { 
  in_quotation_string.push(data.charAt(data_index)); 
  in_string = true;
 }

 if(
  in_quotation_string.length > 1 && 
  in_quotation_string[in_quotation_string.length - 1] === in_quotation_string[0] && 
  in_function === true
 ) { 
  in_quotation_string = [];
  in_string = false;
 }

 if(in_string === false && data.charAt(data_index) === '{' && in_function === true) { 
  opening_bracket.push('{');
  has_bracket = true;
 } else if(in_string === false && data.charAt(data_index) === '}' && in_function === true) { 
  closing_bracket.push('}');
 }

 build_string += data.charAt(data_index);

 if(is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n' && in_function === true) { //arrow no bracket --- 
  push_function();
 } else if((opening_bracket.length === closing_bracket.length) && (opening_bracket.length > 0 && closing_bracket.length > 0) && in_function === true) { //arrow bracket function bracket
  push_function();
 }

 data_index = data_index + 1;
 return iterate_through_file_text(data_index);

}

function build_unit_configuration() { 
 
 var ug_return = '';

 for(let i = 0; i < unit_configuration.length; i++) { 
  ug_return += 
   `${unit_configuration[i]}: {
     on: true,
     index_exact: true,
     values: []
    },`; 
 }

 return ug_return;

}

function back_track_parameters(bt_index) { 

 if(
  data.charAt(bt_index) === "'" || 
  data.charAt(bt_index) === '`' || 
  data.charAt(bt_index) === `'` && 
  in_function === true
 ) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
 }

 if(
  in_bt_quotation_string.length > 1 && 
  in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0] && 
  in_function === true
 ) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
 }

 if(in_bt_string === false && data.charAt(bt_index) === ')' && in_function === true) {
  closing_bt_parentheses.push(')');
 } else if(in_bt_string === false && data.charAt(bt_index) === '(' && in_function === true) { 
  opening_bt_parentheses.push('(');
 }

 if(in_function === true) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
 }

 if((closing_bt_parentheses.length === opening_bt_parentheses.length) && in_function === true) {
  bt_arrow_parameter_string = bt_arrow_parameter_string.join();
  return; 
 }

 bt_index = bt_index - 1;

 return back_track_parameters(bt_index);

} 

function push_function() {

 var ug = build_unit_configuration();

 exported_functions += (`
  { 
   index: '${function_index}',
    function_called: {
    on: true,
    description: '${fp}',
    parameters: [],
    function: ${build_string.eval()}
   }, 
    unit: { 
     ${ug}
    }, 
   },
 `);
  
 function_index = function_index + 1;
 build_string = '';
 has_bracket = false;
 in_function = false;

}

module.exports = generate; 