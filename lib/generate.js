var fs = require('file-system');

  /*

  * data about the file. line_number and fp used in the build string description

  * @param {data_index} the character index in the file
  * @param {data} the files text
  * @param {data_length} used to end the file... could use error
  * @param {exported_functions} the long string of functions placed in file
  * @param {unit_configuration} the array of unit tests allowed to add
  * @param {fp} the file path of the function
  * @param {line_number} the line number of the function
  
  */

  var data_index = 0;
  var data = '';
  var data_length = 0;
  var exported_functions = 'module.exports = [ \n';
  var unit_configuration = [];
  var fp = '';
  var line_number = 0;

  /*

  * denoting inside or outside the function, for reading and acting.. can rid some conditions here

  * @param {in_function} if in function or not in function for operations

  */

  var in_function = false;

  /*

  * outside the function

  * @param {in_string_outside_of_function} the array denoting when a string starts and stopes outside a function
  * @param {in_string_outside_of_function_} compliment of above. on or off signifies not to execute some conditions
  * @param {in_comment_outside_function_single} denoting if i am in a single line comment outide the function
  * @param {in_comment_type_outside_function_multi} tracking multiline comments outside function... could use a count here and not an array..
  * @param {in_comment_type_outside_function_multi_} compliment of above. signifies whether to execute some conditions
  
  */

  var in_string_outside_of_function = [];
  var in_string_outside_of_function_ = false;
  var in_comment_outside_function_single = false;
  var in_comment_type_outside_function_multi = [];
  var in_comment_type_outside_function_multi_ = false;

  /*

  * inside the function

  * @param {in_quotation_string} the array denoting when a string starts and stopes inside a function
  * @param {opening_bracket} used to note when a function with brackets ends. could use count instead
  * @param {closing_bracket} used to note when a function with brackets ends. could use count instead
  * @param {build_string} the function being built
  * @param {function_index} index of the function
  * @param {in_arrow} if in an arrow function
  * @param {has_bracket} if the function contains an opening bracket. for arrow function (above)
  * @param {in_comment_inside_function_single} if in a single line comment in a function. leaving by the new line
  * @param {in_comment_type_inside_function_multi} if in a multiline comment in a function
  * @param {in_comment_type_inside_function_multi_} compliment of above used for decision making
  
  */

  var in_quotation_string = [];
  var in_string = false;
  var opening_bracket = [];
  var closing_bracket = [];
  var build_string = '';
  var function_index = 1;
  var is_arrow = false;
  var has_bracket = false;
  var in_comment_inside_function_single = false;
  var in_comment_type_inside_function_multi = []; 
  var in_comment_type_inside_function_multi_ = false; 

  /*

  * recursing arrow function parameters and the drop off for the arrow function name. in function but dont need to mention.

  * @param {bt_arrow_parameter_string} the parameters of the arrow function. built via an array, and joined as a string
  * @param {bt_index} the back tracking of an index
  * @param {bt_index_drop_off_function_name} the index that backtracks the arrow function name. definition used for ending
  * @param {bt_index_drop_off_alphabet} once the first character is hit, set below to on
  * @param {bt_index_drop_off_found_first_character} once on, when first space or new line hit, end and return the name and function parameters
  * @param {bt_index_drop_off_append_equals} once a character is found, make sure to append the equals sign before the function name
  * @param {in_bt_quotation_string} in and out of a string within the parameter set
  * @param {in_bt_string} compliment of above. denotes in and out of a string within the parameter set
  * @param {opening_bt_parentheses} opening parentheses used for ending. could use count
  * @param {closing_bt_parentheses} closing parentheses used for ending. could use count.
  
  */

  var bt_arrow_parameter_string = [];
  var bt_index = 0;
  var bt_index_drop_off_function_name = 0;
  var bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/;
  var bt_index_drop_off_found_first_character = false; 
  var bt_index_drop_off_append_equals = false;
  var in_bt_quotation_string = [];
  var in_bt_string = false;
  var opening_bt_parentheses = [];
  var closing_bt_parentheses = [];

 /* 
  search folders, files and get all arrow functions with and without brackets regular functions with brackets. line numbers, filepaths, function names.
 */

function generate(folders, file_to_generate, unit) {

 unit_configuration = unit;

 for(let i = 0; i < unit_configuration.length; i++) { 
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

 if(typeof(folders) !== 'object' || Array.isArray(folders) == false) { 
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
    file_end_reset_name_space(filepath);
    iterate_through_file_text(data_index); 
   }
  })

 }

 /* 
  create the file and exit
 */

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

 /*
  leave file on data length or last char error
 */

 if(data_index >= data_length) { 
  return;
 }

 /*
  increase line number for file description in build_string
 */

 if(data_index === '\n') { 
  line_number = line_number + 1;
 }

 /*
  check for multiline comment here.. -> just recurse here to make it simpler and to avoid the other parts of the file 
 */


 /*
  check for single line comment here.. -> just recurse here to make it simpler and to avoid the other parts of the file 
 */


 /* 
  i begin traversing a string outside a function
 */

 if(
  data.charAt(data_index) === '"' || 
  data.charAt(data_index) === '`' || 
  data.charAt(data_index) === `'` && 
  in_function === false
  ) { 
  in_string_outside_of_function.push(data.charAt(data_index)); 
  in_string_outside_of_function_ = true;
 }

 /*
  i end traversing a string outside a function
 */

 if(
  in_string_outside_of_function.length > 1 && 
  in_string_outside_of_function[in_string_outside_of_function.length - 1] === in_string_outside_of_function[0] && 
  in_function === false
  ) { 
  in_string_outside_of_function = [];
  in_string_outside_of_function_ = false;
 }

 /* 
  i am in a string outside a function, keep recursing through the character chars (or i am in one of two types of comments)
 */

 if(
  in_string_outside_of_function_ === true && 
  in_function === false
 ) {
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a regular function and start the build string
 */

 if(
  data.charAt(data_index - 1) === ' ' || data.charAt(data_index - 1) === '\n' &&
  data.charAt(data_index) === 'f' && 
  data.charAt(data_index+1) === 'u' && 
  data.charAt(data_index+2) === 'n' && 
  data.charAt(data_index+3) === 'c' && 
  data.charAt(data_index+4) === 't' && 
  data.charAt(data_index+5) === 'i' && 
  data.charAt(data_index+6) === 'o' && 
  data.charAt(data_index+7) === 'n' && 
  data.charAt(data_index+8) === ' '
 ) {
  in_function = true;
  build_string += 'function';
  data_index = data_index + 9;
  is_arrow = false;
  return iterate_through_file_text(data_index);
 }

 /*
  enter into an arrow function and start the build string
 */

 if(
  data.charAt(data_index - 1) === ' ' || data.charAt(data_index - 1) === '\n' &&
  data.charAt(data_index) === '=' && 
  data.charAt(data_index+1) === '>' && 
  data.charAt(data_index+2) === ' '
 ) {
  in_function = true;
  bt_arrow_parameter_string = [];
  bt_index = data_index - 1;
  in_bt_quotation_string = [];
  in_bt_string = false;
  opening_bt_parentheses = [];
  closing_bt_parentheses = [];
  is_arrow = true;
  bt_index_drop_off_found_first_character = false;
  back_track_parameters(bt_index);
  build_string += `${bt_arrow_parameter_string} =>`; 
  data_index = data_index + 3;
  return iterate_through_file_text(data_index);
 }

 /*
  check for multiline comment here.. <- dont recurse herre, just make sure a conditions is set to avoid traversing strings and appending brackets and going in single line comments i guess also pushing the function
 */

 /*
  check for single line comment here. <- dont recurse herre, just make sure a conditions is set to avoid traversing strings and appending brackets and going in multiline comments i guess also pushing the function
 */

 /*
  I begin traversing a string inside a function. ignore if in comment
  && in multi-line is false and in single line is false
 */

 if(
  data.charAt(data_index) === '"' || 
  data.charAt(data_index) === '`' || 
  data.charAt(data_index) === `'` && 
  in_function === true
 ) {
  in_quotation_string.push(data.charAt(data_index)); 
  in_string = true;
 }

 /*
  I end traversing a string inside a function. ignore if in comment
  && in multi-line is false and in single line is false
 */

 if(
  in_quotation_string.length > 1 && 
  in_quotation_string[in_quotation_string.length - 1] === in_quotation_string[0] && 
  in_function === true
 ) { 
  in_quotation_string = [];
  in_string = false;
 }

 /*
  I push an opening or closing bracket if i am not in a string, and multi/single line comment. bracket lengths denote when the function ends... could use count here
 */

 if(in_string === false && data.charAt(data_index) === '{' && in_function === true) {
  opening_bracket.push('{'); //count
  has_bracket = true;
 } else if(in_string === false && data.charAt(data_index) === '}' && in_function === true) {
  closing_bracket.push('}'); //count
 }

 /* 
  pushing every data variable to the build_string, which is a function
 */

 build_string += data.charAt(data_index);

 /* 
  end creating the function. (both brackets equal, or arrow function new line) ... count instead of bracket length instead of array
 */

 if(
  (is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n') || 
  ((opening_bracket.length === closing_bracket.length) && (opening_bracket.length > 0 && closing_bracket.length > 0)) && 
  in_function === true //maybe add a string, multi, single stop here. unecessary but helps note no function will be pushed
 ) { 
  push_function();
 } 

 /*
  move to the next character
 */

 data_index = data_index + 1;
 return iterate_through_file_text(data_index);

}

/*
 build the unit config object...
*/

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

/*
 build the parameters for the arrow function. have to backtrack characters
*/

function back_track_parameters(bt_index) { 

 /*
  i begin traversing a string inside a function parameter set
 */

 if(
  data.charAt(bt_index) === '"' || 
  data.charAt(bt_index) === '`' || 
  data.charAt(bt_index) === `'`
 ) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
 }

 /*
  i end traversing a string inside a function parameter set
 */

 if(
  in_bt_quotation_string.length > 1 && 
  in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0]
 ) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
 }

 /*
  push a parentheses if not in a string. could use count
 */

 if(in_bt_string === false && data.charAt(bt_index) === ')') {
  closing_bt_parentheses.push(')');
 } else if(in_bt_string === false && data.charAt(bt_index) === '(') { 
  opening_bt_parentheses.push('(');
 }

 /*
  adding to the arrow function parameter string
 */

 bt_arrow_parameter_string.unshift(data.charAt(bt_index));
 
 /*
  return the parameters "wow = (a,b,c)"
 */

 if(
  (closing_bt_parentheses.length === opening_bt_parentheses.length) && 
  (closing_bt_parentheses.length > 0 && opening_bt_parentheses.length > 0)
 ) { 
  bt_index_drop_off_function_name = bt_index - 1;
  get_arrow_parameter_function_name(bt_index_drop_off_function_name);
  bt_arrow_parameter_string = bt_arrow_parameter_string.join();
  return; 
 }

 /*
  move back one character and go again
 */

 bt_index = bt_index - 1;

 return back_track_parameters(bt_index);

} 

/*
 get the arrow function name by backtracking
*/

function get_arrow_parameter_function_name(bt_index_drop_off_function_name) { 

  /*
   the function name has been appended because a space between the type and function or a : if an object
  */

  if(
   bt_index_drop_off_found_first_character === true && 
   (data.charAt(bt_index_drop_off_function_name) === ' ' || data.charAt(bt_index_drop_off_function_name) === ':') 
  ) { 
    //-> const wow = () => { } a
    //-> a: wow = () => { } b
    //-> a:wow = () => { } c
   return;
  } else if(bt_index_drop_off_found_first_character === false && data.charAt(bt_index_drop_off_function_name) === ':') { 
    //backtrack object name or return
    //-> a: () => { } a
    //-> b:() => { } b - first iteration
    //or just return out with no name
    return
  }

  /*
   if the first character hasnt been found yet, check to see if a first character was found
  */

  if(bt_index_drop_off_found_first_character === false) {
    bt_index_drop_off_found_first_character = bt_index_drop_off_alphabet.test(data.charAt(bt_index_drop_off_function_name)); 
  }

  /*
   if first character found, unshift.. if first found and first time, make sure to append an equals sign first... this is so i only use one space
  */

  if(bt_index_drop_off_found_first_character === true && bt_index_drop_off_append_equals === false) { 
    bt_index_drop_off_append_equals = true
    bt_arrow_parameter_string.unshift(' = ');
    bt_arrow_parameter_string.unshift(data.charAt(bt_index_drop_off_function_name));
  } else if(bt_index_drop_off_found_first_character === true && bt_index_drop_off_append_equals === true) { 
    bt_arrow_parameter_string.unshift(data.charAt(bt_index_drop_off_function_name));
  } 

  /*
   move back one
  */

  bt_index_drop_off_function_name = bt_index_drop_off_function_name - 1;

  return get_arrow_parameter_function_name(bt_index_drop_off_function_name);

}

 /*
  push the function.. 
 */

function push_function() {

 var ug = build_unit_configuration();

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
  
 /*
  reset everything and note that i am now out of a function
 */

 function_index = function_index + 1;
 build_string = '';
 has_bracket = false;
 in_function = false;
 opening_bracket = []; 
 closing_bracket = [];
 //look into this a little more

}

 /*
  reset namespace
 */

function file_end_reset_name_space(filepath) { 
  data_index = 0;
  data = fs.readFileSync(filepath, 'utf8');
  data_length = data.length;
  exported_functions = 'module.exports = [ \n';
  unit_configuration = [];
  fp = '';
  line_number = 0;
  in_function = false;
  in_string_outside_of_function = [];
  in_string_outside_of_function_ = false;
  in_comment_outside_function_single = false;
  in_comment_type_outside_function_multi = [];
  in_comment_type_outside_function_multi_ = false;
  in_quotation_string = [];
  in_string = false;
  opening_bracket = [];
  closing_bracket = [];
  build_string = '';
  function_index = 1;
  is_arrow = false;
  has_bracket = false;
  in_comment_inside_function_single = false;
  in_comment_type_inside_function_multi = []; 
  in_comment_type_inside_function_multi_ = false; 
  bt_arrow_parameter_string = [];
  bt_index = 0;
  bt_index_drop_off_function_name = 0;
  /*bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/;*/
  bt_index_drop_off_found_first_character = false; 
  bt_index_drop_off_append_equals = false;
  in_bt_quotation_string = [];
  in_bt_string = false;
  opening_bt_parentheses = [];
  closing_bt_parentheses = [];
}

module.exports = generate;