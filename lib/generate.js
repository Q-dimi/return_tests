var fs = require('file-system');

//make sure to check the names on the functions for both arrow and reglar functions. right now name is being pushed for regular functions but no name for arrow functions... both ways work as is but if wanting the names and a standard. to do this just measure opening and closing spaces '/r or whatever that character is because we are programmers and we dont care. period.'
//get rid of the in_function === true for parameters and other things. clean it up
//add an ignore comments for functions as well... wasnt going to but in case brackets are uneven there
// beeld... BIELD and dont let the fear induce you into thinking that i will command you. i will never command you. you will command yourself. and we will command together for what we agree is commandable or commendable. okay. and if your mind is too perpetual for that, then i assume you are not being let known some things you fool. no, im jk calm down. calm your perpetuality. your reality of your obtrusive and at times discreet perpetuality.

var function_in_string = [];
var function_string = false;
var in_function = false; //used for reading
var in_comment_outside_function_single = false; //used as the on off
var in_comment_type_outside_function_multi = [];
var in_comment_type_outside_function_multi_ = false; // used as the on off

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
var in_comment_inside_function_single = false; //used as the on off
var in_comment_type_inside_function_multi = []; 
var in_comment_type_inside_function_multi_ = false;  //used as the on off

var bt_arrow_parameter_string = [];
var bt_index = 0;
var in_bt_quotation_string = [];
var in_bt_string = false;
var opening_bt_parentheses = [];
var closing_bt_parentheses = [];

function generate(folders, file_to_generate, unit) {

 unit_configuration = unit;

 //check for unit types
 for(let i = 0; i < unit_configuration.length; i++) { 
  if(unit_configuration[i] !== 'must_be_value' && unit_configuration[i] !== 'must_be_type' && unit_configuration[i] !== 'must_pass_regex' && unit_configuration[i] !== 'must_be_log_of' && unit_configuration[i] !== 'must_be_greater_than' && unit_configuration[i] !== 'must_be_less_than' && unit_configuration[i] !== 'must_be_in_range' && unit_configuration[i] !== 'must_be_even_or_odd' && unit_configuration[i] !== 'must_be_divisible_by' && unit_configuration[i] !== 'must_be_prime_or_not_prime' && unit_configuration[i] !== 'must_be_log_of' ) {
   throw new Error('unit array must only contain allowed unit tests');
  }
 }

 //check if folders is an array
 if(typeof(folders) !== 'object' || Array.isArray(folders) == false) { 
  throw new Error('an array was not passed');
 }

 //go through folders and for each file, grab arrow and regular functions... both with brackets and no brackets
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

  //enter into a file... just reset everything
  fs.recurseSync(folders[i].folder, folders[i].files == 'all' ? null : folders[i].files, (filepath, relative, filename) => {

   if(filename) { 

    data = fs.readFileSync(filepath, 'utf8');

    function_in_string = [];
    function_string = false;
    in_function = false;
    in_comment_outside_function_single = false;
    in_comment_type_outside_function_multi = []; 
    in_comment_type_outside_function_multi_ = false;

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
    in_comment_inside_function_single = false;
    in_comment_type_inside_function_multi = [];
    in_comment_type_inside_function_multi_ = false;

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

 //exit and create the file
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

 //increase line number for file description in build_string
 if(data_index === '\n') { 
  line_number = line_number + 1;
 }

 //check for multiline comment here.. -> just recurse here to make it simpler and to avoid the other parts of the file me loov K mmm

 //check for single line comment here.. -> just recurse here to make it simpler and to avoid the other parts of the file me loov K mmm

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

 //i am in a string outside a function, keep recursing through the character chars (or i am in one of two types of comments)
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
  build_string += `${bt_arrow_parameter_string} =>`; 
  data_index = data_index + 2;
  return iterate_through_file_text(data_index);
 }

 //check for multiline comment here.. set to on to avoid going through single line comments, strings and also to avoid adding brackets to non existant functions... (if a multiline comment exists and a single line comment exits ignore it until reached the end of the multiline comment)  <- dont recurse herre, just make sure a conditions is set to avoid traversing strings and appending brackets

 //check for single line comment here.. set to on to avoid going through multi line comments and strings and also to avoid adding brackets to non existant functions... (if a single line comment is active and a multiline comment exists, ignore it and wait for the new line) <- dont recurse herre, just make sure a conditions is set to avoid traversing strings and appending brackets

 //I begin traversing a string inside a function. ignore if in comment
 if(data.charAt(data_index) === "'" || data.charAt(data_index) === '`' || data.charAt(data_index) === `'` && in_function === true) { 
  in_quotation_string.push(data.charAt(data_index)); 
  in_string = true;
 }

 //I end traversing a string inside a function. ignore if in comment
 if(in_quotation_string.length > 1 && in_quotation_string[in_quotation_string.length - 1] === in_quotation_string[0] && in_function === true) { 
  in_quotation_string = [];
  in_string = false;
 }

 //I push an opening or closing bracket if i am not in a string. bracket lengs denote when the function ends... (add conditions for active comments so that to avoid pushing unecessary brackets my looov K)
 if(in_string === false && data.charAt(data_index) === '{' && in_function === true) { 
  opening_bracket.push('{');
  has_bracket = true;
 } else if(in_string === false && data.charAt(data_index) === '}' && in_function === true) { 
  closing_bracket.push('}');
 }

 //pushing every data variable to the build_string, which is a function
 build_string += data.charAt(data_index);

 //end creating the function. (both brackets equal, or arrow function new line)
 if((is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n' && in_function === true) || ((opening_bracket.length === closing_bracket.length) && (opening_bracket.length > 0 && closing_bracket.length > 0) && in_function === true)) { //move in_function to the end and rearragne others to save logic time
  push_function();
 } 

 //move to the next character
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

///build the parameters for the arrow function. have to backtrack characters
//i will always be in a function here but i decided to add conditions just to note. will remove them to save time after
function back_track_parameters(bt_index) { 

 //i begin traversing a string inside a function parameter set
 if(data.charAt(bt_index) === "'" || data.charAt(bt_index) === '`' || data.charAt(bt_index) === `'` && in_function === true) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
 }

 //i end traversing a string inside a function parameter set
 if(in_bt_quotation_string.length > 1 && in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0] && in_function === true) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
 }

 //push a parentheses if not in a string.
 if(in_bt_string === false && data.charAt(bt_index) === ')' && in_function === true) {
  closing_bt_parentheses.push(')');
 } else if(in_bt_string === false && data.charAt(bt_index) === '(' && in_function === true) { 
  opening_bt_parentheses.push('(');
 }

 //dont need the if statement here, but signifies im in the function (i just wanted to label all the conditions so i can categorize them)
 if(in_function === true) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
 }

 //return the parameters "(a,b,c)"
 if((closing_bt_parentheses.length === opening_bt_parentheses.length) && in_function === true) {
  bt_arrow_parameter_string = bt_arrow_parameter_string.join();
  return; 
 }

 //move back one character and go again
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
  
 //reset everything and note that i am now out of a function
 function_index = function_index + 1;
 build_string = '';
 has_bracket = false;
 in_function = false;
 opening_bracket = []; //ended the function, remove all brackets from both
 closing_bracket = [];

}

module.exports = generate; 