var fs = require('file-system'); //whats a name space. this is environment dependent code and no one else is writing it so it is not necessary to use a namespace aidan. it just wastes time. you fucking fool. munch. https://www.youtube.com/watch?v=amRoh96Z2to YOU FOOL!

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
var line_number = 0;

var bt_arrow_parameter_string = [];
var bt_index = 0;
var in_bt_quotation_string = [];
var in_bt_string = false;
var opening_bt_parentheses = [];
var closing_bt_parentheses = [];

function generate(folders, file_to_generate, unit) {

 unit_configuration = unit;

 for(let i = 0; i < unit_configuration.length; i++) { //im suing for stocking if you want to keep following me in the nissan bro. Its kind of funny its the same type, year and make i have. Maybe ill look at those cameras at the alcohol place tomorrow. na, you're probably going to go to jail if you dont stop. im not kidding. im preparing my documents and im calling some people (if i have to). If anything happens its you whos responsible. if you like programming, thats great. there are many amazing female computer scientists out there to look up to if you're feeling not-0 enough. and you too bro. go get yours at w3schools.
  if(unit_configuration[i] !== 'must_be_value' && unit_configuration[i] !== 'must_be_type' && unit_configuration[i] !== 'must_pass_regex' && unit_configuration[i] !== 'must_be_log_of' && unit_configuration[i] !== 'must_be_greater_than' && unit_configuration[i] !== 'must_be_less_than' && unit_configuration[i] !== 'must_be_in_range' && unit_configuration[i] !== 'must_be_even_or_odd' && unit_configuration[i] !== 'must_be_divisible_by' && unit_configuration[i] !== 'must_be_prime_or_not_prime' && unit_configuration[i] !== 'must_be_log_of' ) {
   throw new Error('unit array must only contain allowed unit tests');
  }
 }

 if(typeof(folders) !== 'object' || Array.isArray(folders) == false) { 
  throw new Error('an array was not passed');
 }

 for(let i = 0; i < folders.length; i++) {

  var errors = '';

  if(typeof(folders[i].folder) !== 'string') { 
   errors += 'folder: folder must be a string \n';
  }

  if(typeof(folders[i].files) !== 'string' && (typeof(folders[i].files) !== 'object' || Array.isArray(folders[i].files == false))) { 
   errors += 'files: files must be a string or array \n';
  }

  if(typeof(folders[i].files) == 'string' && folders[i].files !== 'all') {  
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
    function_recursive_count = 0;

    data_index = 0;
    in_quotation_string = [];
    in_string = false;
    opening_bracket = []; 
    closing_bracket = [];
    build_string = '';
    fp = filepath;
    is_arrow = false;
    has_bracket = false;
    line_number = 0;

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

 //leave file on last char errror
 try { 
  var file_end = data.charAt(data_index);
 } catch(err) { 
  return;
 }

 //increase line number for dile description
 if(data_index === '\n') { 
  line_number = line_number + 1;
 }

 //i begin traversing a string outside a function
 if(data.charAt(data_index) === "'" || data.charAt(data_index) === '`' || data.charAt(data_index) === `'` && in_function === false) { 
  function_in_string.push(data.charAt(data_index)); 
  function_string = true;
 }

 //i end traversing a string outside a function
 if(function_in_string.length > 1 && function_in_string[function_in_string.length - 1] === function_in_string[0] && in_function === false) { 
  function_in_string = [];
  function_string = false;
 }

 //i am in a string outside a function, keep recursing through the character chars
 if(function_string === true && in_function === false) {
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 //enter into a regular function and start the build string
 if(data.charAt(data_index) === 'f' && data.charAt(data_index+1) === 'u' && data.charAt(data_index+2) === 'n' && data.charAt(data_index+3) === 'c' && data.charAt(data_index+4) === 't' && data.charAt(data_index+5) === 'i' && data.charAt(data_index+6) === 'o' && data.charAt(data_index+7) === 'n') { 
  in_function = true;
  build_string += 'function';
  data_index = data_index + 8;
  is_arrow = false;
  return iterate_through_file_text(data_index);
 }

 //enter into an arrow function and start the build string
 if(data.charAt(data_index) === '=' && data.charAt(data_index+1) === '>') {
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

 //I begin traversing a string inside a function. 
 if(data.charAt(data_index) === "'" || data.charAt(data_index) === '`' || data.charAt(data_index) === `'` && in_function === true) { 
  in_quotation_string.push(data.charAt(data_index)); 
  in_string = true;
 }

 //I end traversing a string inside a function. 
 if(in_quotation_string.length > 1 && in_quotation_string[in_quotation_string.length - 1] === in_quotation_string[0] && in_function === true) { 
  in_quotation_string = [];
  in_string = false;
 }

 //I push an opening or closing bracket if i am not in a string.
 if(in_string === false && data.charAt(data_index) === '{' && in_function === true) { 
  opening_bracket.push('{');
  has_bracket = true;
 } else if(in_string === false && data.charAt(data_index) === '}' && in_function === true) { 
  closing_bracket.push('}');
 }

 //pushing every data variable to the build_string, which is a function
 build_string += data.charAt(data_index);

 //end creating te function. (both brackets equal or arrow function new line)
 if(is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n' && in_function === true) {
  push_function();
 } else if((opening_bracket.length === closing_bracket.length) && (opening_bracket.length > 0 && closing_bracket.length > 0) && in_function === true) {
  push_function();
 }

 //move ot the next character
 data_index = data_index + 1;
 return iterate_through_file_text(data_index);

}

//build the unit config object...
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

///build the parameters for the arrow function. have to beacktrack on this...
function back_track_parameters(bt_index) { 

 //i begin traversing a string inside a function.. the string in the parameter set ("a","bsd", 'c')
 if(data.charAt(bt_index) === "'" || data.charAt(bt_index) === '`' || data.charAt(bt_index) === `'` && in_function === true) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
 }

 //i end traversing a string inside a function (parameter string).. 
 if(in_bt_quotation_string.length > 1 && in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0] && in_function === true) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
 }

 //push a paretheses if not in a string.
 if(in_bt_string === false && data.charAt(bt_index) === ')' && in_function === true) {
  closing_bt_parentheses.push(')');
 } else if(in_bt_string === false && data.charAt(bt_index) === '(' && in_function === true) { 
  opening_bt_parentheses.push('(');
 }

 //dont need the if statement here, but signifies im in the function (i just wanted to label all the conditions so i can categorize them you fool hierarchely or as they are)
 if(in_function === true) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
 }

 //return the parameters "(a,b,c)"
 if((closing_bt_parentheses.length === opening_bt_parentheses.length) && in_function === true) {
  bt_arrow_parameter_string = bt_arrow_parameter_string.join();
  return; 
 }

 //move back one go again
 bt_index = bt_index - 1;

 return back_track_parameters(bt_index);

} 

function push_function() {

 var ug = build_unit_configuration();

 //push the function.. first function pushed then inner functions
 exported_functions += (`
  { 
   index: '${function_index}',
    function_called: {
    on: true,
    description: 'filepath: ${fp} \n line number ${line_number}',
    parameters: [],
    function: ${build_string.eval()}
   }, 
    unit: { 
     ${ug}
    }, 
   },
 `);
  
 //reset everything and note that i am noe out of a function
 function_index = function_index + 1;
 build_string = '';
 has_bracket = false;
 in_function = false;

}

module.exports = generate; 