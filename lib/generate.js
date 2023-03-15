  
  /* 

   Title: generate

   Description: 
   strips every chosen type of function in .html, .js, .ts files. Supports react.
   does not strip functions that are found inside strings("'`), single line comments and multline comments and outside of script tags in html documents. 
   Includes the line number, filepath and function name for each function.
   Includes a list of function types to strip. All configurable.

   Author: Alexander
   License: MIT

   TODO:
   https://blog.sessionstack.com/how-javascript-works-the-different-ways-of-declaring-a-function-5-best-practices-8a0324c06fe2
   use backtracking arrays on every function that is found. use conditions on array to determine type of function early to avoid running certain conditions. use a conditional set on the first x characters in the backtracking array.... then assign the type and move one. if only one type is determined, then no need for many true false statements. Can just use one.
   append a key on each parameter name for each backtrack arrow_x, regular_y
   make sure to recurse on if a function is invokable (); - do this at the end
   add config properties for each of the function types. just seperate all of the function types not including closed scope '('
   add an error handler on backtracking... if unknown character found or known character out of position
   take template literals intto consideration
   make each backtracking beginning set a file. and pass in data and use the parameters above for that file just to make things easier to read
   michael urbisci is reverse shelling me and placing bad data on my computer
  */

  var fs = require('file-system');

  /* 
  * data about the file. line_number and fp used in the build string description
  * @param {data_index} the character index in the file
  * @param {data} the files text
  * @param {data_length} used to end the file... could use error
  * @param {exported_functions} the long string of functions placed in file
  * @param {unit_configuration} the array of unit tests allowed to add
  * @param {fp} the file path of the function
  * @param {line_number} the current line number
  * @param {function_line_number} the line number of the function
  * @param {folders} folders of all the files to test
  * @param {file_type} whether a .html, .js or .ts file. Used for determining certain types of functions and when to check for functions. example <script
  * @param {debug} array of specific actions to make sure things are kept in order
  * @param {function_types} types of functions being stripped
  */

  var data_index = 0;
  var data = '';
  var data_length = 0;
  var exported_functions = 'module.exports = [ \n';
  var unit_configuration = [];
  var fp = '';
  var line_number = 0;
  var function_line_number = 0;
  var folders = [];
  var debug = [];
  var file_type = '';
  var function_types = {
    regular: true,
    arrow: true, 
    react_function_component: false, 
    react_class_component: false
  }

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
  * @param {in_comment_type_outside_function_multi} tracking multiline comments outside the function
  * @param {in_html_script} determining to continue recursing or check for functions in an html document
  * @param {html_end_script_data_index} the index when > is found in beginning script tag. Have to recurse in case of <     script>
  * @param {html_end_script_data_index_two} the index when > is found in ending script tag. Have to recurse in case of </    script>
  * @param {in_string_inside_of_html_script} the array denoting when a string starts and stops inside a script tag
  * @param {in_string_inside_of_html_script_} compliment of above. on or off signifies not to execute some conditions
  */

  var in_string_outside_of_function = [];
  var in_string_outside_of_function_ = false;
  var in_comment_outside_function_single = false;
  var in_comment_type_outside_function_multi = false;
  var in_html_script = false;
  var html_end_script_data_index = 0;
  var html_end_script_data_index_two = 0;
  var in_string_inside_of_html_script = [];
  var in_string_inside_of_html_script_ = false;

  /*
  * inside the function. Strings, single line and multiline comments are used to determine wheter a bracket should be added. Brackets determine function end.
  * @param {opening_bracket} used to note when a function with brackets ends. could use count instead
  * @param {closing_bracket} used to note when a function with brackets ends. could use count instead
  * @param {build_string} the function being built
  * @param {function_index} index of the function
  * @param {in_arrow} if in an arrow function
  * @param {has_bracket} if the function contains an opening bracket. for arrow function (above)
  * @param {in_string_inside_of_function} the array denoting when a string starts and stops inside a function
  * @param {in_string_inside_of_function_} compliment of above. on or off signifies not to execute some conditions
  * @param {in_comment_inside_function_single} denoting if i am in a single line comment inside the function
  * @param {in_comment_type_inside_function_multi} tracking multiline comments inside the function
  * @param {drop_off_index_reg} index used to determine if an async function
  * @param {bt_regular_parameter_string} using this to backtrack and build the beginning of the build string. "var wow = async function" then pushing the character sets
  * @param {regular_function_type_found} if type of function found, avoid running async or run async (,+,-,~,! 
  * @param {regular_function_async_found} if async found, append and also check for the last character... then end it
  * @param {regular_function_found_equals} when equals is found, turn off others and the function name then type
  */

  var opening_bracket = 0;
  var closing_bracket = 0;
  var build_string = '';
  var function_index = 1;
  var is_arrow = false;
  var has_bracket = false;
  var in_string_inside_of_function = [];
  var in_string_inside_of_function_ = false;
  var in_comment_inside_function_single = false;
  var in_comment_type_inside_function_multi = false;
  var drop_off_index_reg = 0;
  var bt_regular_parameter_string = [];
  var regular_function_type_found = false;
  var regular_function_async_found = false;
  var regular_function_found_equals = false; 

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
  * @param {bt_af_is_async_check} used to turn on or off the condition that appends 'async'
  */

  var bt_arrow_parameter_string = [];
  var bt_index = 0;
  var bt_index_drop_off_function_name = 0;
  var bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/;
  var bt_index_drop_off_found_first_character = false; 
  var bt_index_drop_off_append_equals = false;
  var in_bt_quotation_string = [];
  var in_bt_string = false;
  var opening_bt_parentheses = 0;
  var closing_bt_parentheses = 0;
  var bt_af_is_async_check = false;

/* 
  * search folders, files and get all arrow functions with and without brackets regular functions with brackets. line numbers, filepaths, function names.
  * @param {fldr} folders being traversed
  * @param {f_t_g} The function file path being written to. if non existant, is created.
  * @param {unit} the units you are deciding to test
  * @param {f_t} The function types you would like to strip
*/

function generate(fldrs, f_t_g, unit, f_t) {

 var error_initial = '';

 if(
  typeof(f_t) !== 'object' ||
  typeof(f_t.regular) !== 'boolean' || 
  typeof(f_t.arrow) !== 'boolean' || 
  typeof(f_t.react_function_component) !== 'boolean' || 
  typeof(f_t.react_class_component) !== 'boolean'
 ) { 
  error_initial += 'f_t: function types must be regular, arrow, react_function_component and react_class_component \n';
 }

 for(let i = 0; i < unit.length; i++) { 
  if(
    unit[i] !== 'must_be_value' && 
    unit[i] !== 'must_be_type' && 
    unit[i] !== 'must_pass_regex' && 
    unit[i] !== 'must_be_log_of' && 
    unit[i] !== 'must_be_greater_than' && 
    unit[i] !== 'must_be_less_than' && 
    unit[i] !== 'must_be_in_range' && 
    unit[i] !== 'must_be_even_or_odd' && 
    unit[i] !== 'must_be_divisible_by' && 
    unit[i] !== 'must_be_prime_or_not_prime' && 
    unit[i] !== 'must_be_log_of' 
  ) {
   error_initial += 'unit: unit array must only contain allowed unit tests. Found in readme \n';
  }
 }

 if(typeof(f_t_g) !== 'string') { 
  error_initial += 'f_t_g: file to generate must be a string \n';
 }

 if(typeof(fldrs) !== 'object' || Array.isArray(fldrs) == false) { 
  error_initial += 'folders: an array was not passed \n';
 }

 if(error_initial.trim().length > 0) { 
  throw new Error(error_initial);
 }

 function_types = f_t;
 unit_configuration = unit;
 file_to_generate = f_t_g;
 folders = fldrs;

 var ug = ''
  
 for(let i = 0; i < unit_configuration.length; i++) { 
  ug += 
   `${unit_configuration[i]}:{\n` +
    " on: true,\n" +
    " index_exact: true,\n" +
    " values: []\n" +
   "}," 
 }

 unit_configuration = ug;

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

  if(errors.trim().length > 0) { 
   errors += `index: ${i}`;
   throw new Error(errors);
  }

  fs.recurseSync(folders[i].folder, folders[i].files == 'all' ? null : folders[i].files, (filepath, relative, filename) => {

   if(filename) { 

    file_type = filename.split('');

    if(
     file_type.length >= 2 &&
     file_type[file_type.length - 1].toLowerCase() === 's' && 
     file_type[file_type.length - 2].toLowerCase() === 't'
    ) { 
     file_type = 'typescript';
    } else if(
     file_type.length >= 2 &&
     file_type[file_type.length - 1].toLowerCase() === 's' && 
     file_type[file_type.length - 2].toLowerCase() === 'j'
    ) { 
     file_type = 'javascript';
    } else if(
     file_type.length >= 4 &&
     file_type[file_type.length - 1].toLowerCase() === 'l' && 
     file_type[file_type.length - 2].toLowerCase() === 'm' && 
     file_type[file_type.length - 3].toLowerCase() === 't' && 
     file_type[file_type.length - 4].toLowerCase() === 'h'
    ) {
     file_type = 'html';
    } else { 
     file_type = '';
    }

    if(
     file_type === 'html' || 
     file_type === 'javascript' || 
     file_type === 'typescript'
    ) {
     data_index = 0;
     data = fs.readFileSync(filepath, 'utf8');
     data_length = data.length;
     fp = filepath;
     line_number = 0;
     function_line_number = 0;
     in_function = false;
     in_string_outside_of_function = [];
     in_string_outside_of_function_ = false;
     in_comment_outside_function_single = false;
     in_comment_type_outside_function_multi = false;
     in_html_script = false;
     html_end_script_data_index = 0;
     html_end_script_data_index_two = 0;
     in_string_inside_of_html_script = [];
     in_string_inside_of_html_script_ = false;
     opening_bracket = 0;
     closing_bracket = 0;
     build_string = '';
     is_arrow = false;
     has_bracket = false;
     in_comment_inside_function_single = false;
     in_comment_type_inside_function_multi = false; 
     bt_regular_parameter_string = [];
     bt_arrow_parameter_string = [];
     bt_index = 0;
     bt_index_drop_off_function_name = 0;
     bt_index_drop_off_found_first_character = false; 
     bt_index_drop_off_append_equals = false;
     in_bt_quotation_string = [];
     in_bt_string = false;
     opening_bt_parentheses = 0;
     closing_bt_parentheses = 0;
     drop_off_index_reg = 0;
     iterate_through_file_text(data_index); 
    }

   }

  })

 }

 /* 
  create the file and exit
 */

 exported_functions += '\n ];';
 var error = `functions have successfully been copied into ${file_to_generate}`;

 try {
  fs.writeFileSync(file_to_generate, exported_functions);
 } catch(err) { 
  error = error.message;
 }

 return error;

}

/*
recursing on every condition while turning things on and off, making things easier to read. When a definition for a function is found, backtracking to start the build string with the correct beginning value of the function.
*/

function iterate_through_file_text(data_index) {

 /*
  leave file on data length
 */

 if(data_index >= data_length) { 
  return;
 }

 /*
  increase line number for file description in build_string
 */

 if(data.charAt(data_index) === '\n') { 
  line_number = line_number + 1;
 }

 /*
  enter into an html comment
 */

 if(
  file_type === 'html' && 
  in_html_script === false && 
  in_html_comment === false && 
  data.charAt(data_index) === '<' && 
  data.charAt(data_index + 1) === '!' && 
  data.charAt(data_index + 2) === '-' && 
  data.charAt(data_index + 3) === '-'
 ) { 
  in_html_comment = true;
  data_index = data_index + 4; 
  return iterate_through_file_text(data_index);
 }

 /*
  exit an html comment
 */

 if(
  file_type === 'html' && 
  in_html_script === false && 
  in_html_comment === true && 
  data.charAt(data_index) === '-' && 
  data.charAt(data_index + 1) === '-' && 
  data.charAt(data_index + 2) === '>'
 ) { 
  in_html_comment = false;
  data_index = data_index + 3; 
  return iterate_through_file_text(data_index);
 }

 /*
  enter into an html script
 */

 if(
  file_type === 'html' && 
  in_html_comment === false &&
  in_html_script === false && 
  recurse_check_script(data_index) === true
 ) { 
  in_html_script = true;
  data_index = html_end_script_data_index;
  return iterate_through_file_text(data_index);
 }

 /*
  exit an html script
 */

 if(
  file_type === 'html' && 
  in_html_comment === false &&
  in_html_script === true && 
  recurse_check_end_script(data_index) === true
 ) { 
  in_html_script = false;
  data_index = html_end_script_data_index_two;
  return iterate_through_file_text(data_index);
 }

 /*
  if not in a script and in an html doc, move next
 */

 if(
  file_type === 'html' && 
  in_html_script === false 
 ) { 
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a multiline comment outside the function
 */

 if(
  in_comment_type_outside_function_multi === false &&
  in_comment_outside_function_single === false && 
  in_string_outside_of_function_ === false &&
  data.charAt(data_index) === '/' &&
  data.charAt(data_index + 1) === '*' && 
  in_function === false
 ) { 
  in_comment_type_outside_function_multi = true;
  data_index = data_index + 2;
  debug.push('1A MULTI');
  return iterate_through_file_text(data_index);
 }

 /*
  exit a multiline comment outside the function
 */

 if(
  in_comment_type_outside_function_multi === true && 
  in_comment_outside_function_single === false && 
  in_string_outside_of_function_ === false &&
  data.charAt(data_index) === '*' &&
  data.charAt(data_index + 1) === '/' && 
  in_function === false
 ) { 
  in_comment_type_outside_function_multi = false;
  data_index = data_index + 2; 
  debug.push('1B MULTI');
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a single line comment outside the function
 */

 if(
  in_comment_outside_function_single === false &&
  in_comment_type_outside_function_multi === false &&
  in_string_outside_of_function_ === false &&
  data.charAt(data_index) === '/' &&
  data.charAt(data_index + 1) === '/' && 
  in_function === false
 ) { 
  in_comment_outside_function_single = true;
  data_index = data_index + 2;
  debug.push('1A SINGLE');
  return iterate_through_file_text(data_index);
 }

 /*
  exit a single line comment outside the function
 */

 if(
  in_comment_outside_function_single === true &&
  in_comment_type_outside_function_multi === false &&
  in_string_outside_of_function_ === false &&
  data.charAt(data_index) === '\n' && 
  in_function === false
 ) { 
  in_comment_outside_function_single = false;
  data_index = data_index + 1; 
  debug.push('1B SINGLE');
  return iterate_through_file_text(data_index);
 }

 /*
  exit a string outside the function
 */

 if(
  in_string_outside_of_function_ === true &&
  in_comment_outside_function_single === false &&
  in_comment_type_outside_function_multi === false &&
  in_string_outside_of_function.length > 1 && 
  in_string_outside_of_function[in_string_outside_of_function.length - 1] === in_string_outside_of_function[0] && 
  in_function === false
 ) { 
  in_string_outside_of_function = [];
  in_string_outside_of_function_ = false;
  debug.push('1B STRING MANY');
  return iterate_through_file_text(data_index);
 }

 /* 
  enter into a string outside the function
 */

 if(
  (in_string_outside_of_function_ === false || in_string_outside_of_function_ === true) &&
  (in_comment_outside_function_single === false && in_comment_type_outside_function_multi === false) &&
  (data.charAt(data_index) === '"' || data.charAt(data_index) === '`' || data.charAt(data_index) === `'`) && 
  in_function === false
 ) { 
  in_string_outside_of_function.push(data.charAt(data_index)); 
  in_string_outside_of_function_ = true;
  data_index = data_index + 1;
  debug.push('1A STRING MANY');
  return iterate_through_file_text(data_index);
 }

 /* 
  if in a string, multiline comment, or single line comment outside of the function, recurse up and dont build a function. Only one should be true
 */  

 if(
  (in_comment_type_outside_function_multi === true || 
  in_comment_outside_function_single === true || 
  in_string_outside_of_function_ === true) && 
  in_function === false
 ) {
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 /* 
  Enter into a regular function and start the build string.
 */

 if(
  check_regular() === true && 
  in_function === false && 
  function_types.regular === true
 ) {
  in_function = true;
  drop_off_index_reg = data_index - 2;
  build_string = back_track_regular(drop_off_index_reg); //same as below.... arrayJoin function
  data_index = data_index + 8; 
  is_arrow = false;
  function_line_number = line_number;
  return iterate_through_file_text(data_index);
 }

 /*
  enter into an arrow function and start the build string
 */

 if(
  check_arrow() === true && 
  in_function === false && 
  function_types.arrow === true
 ) {
  in_function = true;
  bt_arrow_parameter_string = [];
  bt_index = data_index - 1;
  in_bt_quotation_string = [];
  in_bt_string = false;
  opening_bt_parentheses = 0;
  closing_bt_parentheses = 0;
  is_arrow = true;
  bt_index_drop_off_found_first_character = false;
  bt_index_drop_off_function_name = 0;
  bt_index_drop_off_append_equals = false;
  bt_af_is_async_check = false;
  function_line_number = line_number;
  back_track_arrow(bt_index);
  build_string = `${bt_arrow_parameter_string} =>`; 
  data_index = data_index + 2;
  return iterate_through_file_text(data_index);
 }

 /*
  if not in a string, multiline and single line comment and outside the function, where arrow and regular not found, move next
 */

 if(in_function === false) { 
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a multiline comment inside the function
 */

 if(
  in_comment_type_inside_function_multi === false &&
  in_comment_inside_function_single === false && 
  in_string_inside_of_function_ === false &&
  data.charAt(data_index) === '/' &&
  data.charAt(data_index + 1) === '*' && 
  in_function === true
 ) { 
  in_comment_type_inside_function_multi = true;
  build_string += data.charAt(data_index);
  build_string += data.charAt(data_index + 1);
  data_index = data_index + 2;
  debug.push('2A MULTI');
  return iterate_through_file_text(data_index);
 }

 /*
  exit a multiline comment inside the function
 */

 if(
  in_comment_type_inside_function_multi === true && 
  in_comment_inside_function_single === false && 
  in_string_inside_of_function_ === false &&
  data.charAt(data_index) === '*' &&
  data.charAt(data_index + 1) === '/' && 
  in_function === true
 ) { 
  in_comment_type_inside_function_multi = false;
  build_string += data.charAt(data_index);
  build_string += data.charAt(data_index + 1);
  data_index = data_index + 2; 
  debug.push('2B MULTI');
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a single line comment inside the function
 */

 if(
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false &&
  in_string_inside_of_function_ === false &&
  data.charAt(data_index) === '/' &&
  data.charAt(data_index + 1) === '/' && 
  in_function === true
 ) { 
  in_comment_inside_function_single = true;
  build_string += data.charAt(data_index);
  build_string += data.charAt(data_index + 1);
  data_index = data_index + 2;
  debug.push('2A SINGLE');
  return iterate_through_file_text(data_index);
 }

 /*
  exit a single line comment inside the function
 */

 if(
  in_comment_inside_function_single === true &&
  in_comment_type_inside_function_multi === false &&
  in_string_inside_of_function_ === false &&
  data.charAt(data_index) === '\n' && 
  in_function === true
 ) { 
  in_comment_inside_function_single = false;
  build_string += data.charAt(data_index);
  data_index = data_index + 1; 
  debug.push('2B SINGLE');
  return iterate_through_file_text(data_index);
 }

 /*
  exit a string inside the function
 */

 if(
  in_string_inside_of_function_ === true &&
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false &&
  in_string_inside_of_function.length > 1 && 
  in_string_inside_of_function[in_string_inside_of_function.length - 1] === in_string_inside_of_function[0] && 
  in_function === true
 ) { 
  in_string_inside_of_function = [];
  in_string_inside_of_function_ = false;
  debug.push('2B STRING MANY');
  return iterate_through_file_text(data_index);
 }

 /* 
  enter into a string inside the function
 */

 if(
  (in_string_inside_of_function_ === false || in_string_inside_of_function_ === true) &&
  (in_comment_inside_function_single === false && in_comment_type_inside_function_multi === false) &&
  (data.charAt(data_index) === '"' || data.charAt(data_index) === '`' || data.charAt(data_index) === `'`) && 
  in_function === true
 ) { 
  in_string_inside_of_function.push(data.charAt(data_index)); 
  in_string_inside_of_function_ = true;
  build_string += data.charAt(data_index);
  data_index = data_index + 1;
  debug.push('2A STRING MANY');
  return iterate_through_file_text(data_index);
 }

 /*
  if not in a comment or string, keeping count of beginning bracket to know when to end the function
 */

 if(
  in_string_inside_of_function_ === false && 
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false &&
  data.charAt(data_index) === '{' && 
  in_function === true
 ) {
  opening_bracket = opening_bracket + 1; 
  has_bracket = true;
  build_string += data.charAt(data_index);
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 } 

 /*
  if not in a comment or string, keeping count of ending bracket to know when to end the function
 */
 
 if(
  in_string_inside_of_function_ === false && 
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false && 
  data.charAt(data_index) === '}' && 
  in_function === true
 ) {
  closing_bracket = closing_bracket + 1;
  build_string += data.charAt(data_index);
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 }

 /* 
  end creating the function.. this condition should hit one time then going out of the function.
 */

 if(
  ((is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n') || 
  (opening_bracket === closing_bracket && opening_bracket > 0)) && 
  in_function === true &&
  in_string_inside_of_function_ === false && 
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false
 ) { 
  push_function();
  function_index = function_index + 1;
  build_string = '';
  has_bracket = false;
  in_function = false;
  opening_bracket = 0; 
  closing_bracket = 0;
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 }

 /* 
  pushing every character when in the function
 */
 
 if(in_function === true) { 
  build_string += data.charAt(data_index);
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 } 

}

/*
 ARROW BT BEGINNING: ------------------------------------------------------ use backtracking array to turn things on and off so that I can build the beginning of the function.
*/

function check_arrow() { 
  if(
   (data.charAt(data_index-1) === '\s' || data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ' || data.charAt(data_index-1) === ')') &&
   data.charAt(data_index  ) === '='   && 
   data.charAt(data_index+1) === '>'   && 
   (data.charAt(data_index+2) === '\s' || data.charAt(data_index+2) === '\n' || data.charAt(data_index+2) === ' ' || data.charAt(data_index+2) === '{')
  ) { 
   return true;
  } else { 
   return false;
  }
}

function back_track_arrow(bt_index) { 

 /*
  end traversing a string inside a function parameter set
 */

 if(
  in_bt_string === true &&
  in_bt_quotation_string.length > 1 && 
  in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0]
 ) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
  return back_track_arrow(bt_index);
 }

 /*
  begin traversing a string inside a function parameter set. dont need first two but helps make things clear.
 */

 if(
  (in_bt_string === false || in_bt_string === true) &&
  (data.charAt(bt_index) === '"' || data.charAt(bt_index) === '`' || data.charAt(bt_index) === `'`)
 ) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 /*
  track opening and closing parentheses. will always be 1 = 1
 */

 if(in_bt_string === false && data.charAt(bt_index) === ')') {
  closing_bt_parentheses = closing_bt_parentheses + 1;
 } else if(in_bt_string === false && data.charAt(bt_index) === '(') { 
  opening_bt_parentheses = opening_bt_parentheses + 1;
 }

 /*
  adding to the arrow function parameter set. I add every character from opening to close
 */

 bt_arrow_parameter_string.unshift(data.charAt(bt_index));
 
 /*
  return the parameters "wow = (a,b,c)" or "wow = async (a,b,c)" count should always be 1 here for closing and opening 1 = 1
 */

 if(closing_bt_parentheses === opening_bt_parentheses && closing_bt_parentheses === 1) { 
  bt_index_drop_off_function_name = bt_index - 1;
  get_arrow_parameter_function_name(bt_index_drop_off_function_name);
  get_declaration_type(bt_index_drop_off_function_name);
  bt_arrow_parameter_string = bt_arrow_parameter_string.join();
  return; 
 }

 /*
  move back one character and go again
 */

 bt_index = bt_index - 1;
 return back_track_arrow(bt_index);

} 

/*
 get the arrow function name by backtracking
*/

function get_arrow_parameter_function_name(bt_index_drop_off_function_name) { 

  /*
   immediately take async into consideration when c is found here - runs once
  */

  if(
    bt_af_is_async_check === false && 
    data.charAt(bt_index_drop_off_function_name) === 'c' && 
    bt_index_drop_off_found_first_character === false
   ) {
    is_async(bt_index_drop_off_function_name);
    return get_arrow_parameter_function_name(bt_index_drop_off_function_name);
  }

  /*
    the function name has been appended because a space between the declaration type and function. Or stop when a ':' is found where there is no function name. not sure if /s and ' ' are the same thing 
  */

  if(
   (bt_index_drop_off_found_first_character === true && (data.charAt(bt_index_drop_off_function_name) === '\s' || data.charAt(bt_index_drop_off_function_name) === ' ' || data.charAt(bt_index_drop_off_function_name) === ':')) ||
   (bt_index_drop_off_found_first_character === false && data.charAt(bt_index_drop_off_function_name) === ':')
  ) { 
   return;
  }

  /*
   if the first character hasnt been found yet, check to see if a first character exists.
  */

  if(bt_index_drop_off_found_first_character === false) {
    bt_index_drop_off_found_first_character = bt_index_drop_off_alphabet.test(data.charAt(bt_index_drop_off_function_name)); 
  }

  /*
   if first character found, unshift.. if first found and first time, make sure to append an equals sign first.
  */

  if(
    bt_index_drop_off_found_first_character === true && 
    bt_index_drop_off_append_equals === false
  ) { 
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
  if async exists add to the string... if not an async function, index remains the same for the next condition, which begins the function name... look at this again
 */

function is_async(bt_index_drop_off_function_name) { 

 if(
  (data.charAt(bt_index_drop_off_function_name-5) === ' ' || data.charAt(bt_index_drop_off_function_name-5) === '\n' || data.charAt(bt_index_drop_off_function_name-5) === '\s') && //possibly add a :
  data.charAt(bt_index_drop_off_function_name-4) === 'a' &&
  data.charAt(bt_index_drop_off_function_name-3) === 's' &&
  data.charAt(bt_index_drop_off_function_name-2) === 'y' &&
  data.charAt(bt_index_drop_off_function_name-1) === 'n' &&
  data.charAt(bt_index_drop_off_function_name  ) === 'c'
 ) { 
  bt_arrow_parameter_string.unshift(' ');
  bt_arrow_parameter_string.unshift('c');
  bt_arrow_parameter_string.unshift('n');
  bt_arrow_parameter_string.unshift('y');
  bt_arrow_parameter_string.unshift('s');
  bt_arrow_parameter_string.unshift('a');
  bt_index_drop_off_function_name = bt_index_drop_off_function_name - 6;
 }

 bt_af_is_async_check = true;
 return;

}

/*
 get declaration type. backtrack until first letter and check for every type previous to
*/

function get_declaration_type(bt_index_drop_off_function_name) { 

}

/*
 REGULAR BT BEGINNING: ------------------------------------------------------ use backtracking array to turn things on and off so that I can build the beginning of the function. make sure to get all other types here as well. then recurse and define type of function and start and stop when necessary.
 get rid of this and seperate each of these types of functions individually... more code but you can add them each as a config option... make sure equals and closed scope stay =, (... only backtrack oin these two
*/

function check_regular() { 
  if(
   ((data.charAt(data_index-1) === '\s' || data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ') || ((data.charAt(data_index-1) === '=' || data.charAt(data_index-1) === '(' || data.charAt(data_index-1) === '+' || data.charAt(data_index-1) === '-' || data.charAt(data_index-1) === '~' || data.charAt(data_index-1) === '!') && (data.charAt(data_index-2) === ' ' || data.charAt(data_index-2) === '\n' || data.charAt(data_index-2) === '\s'))) && 
   data.charAt(data_index  ) === 'f' && 
   data.charAt(data_index+1) === 'u' &&  
   data.charAt(data_index+2) === 'n' && 
   data.charAt(data_index+3) === 'c' && 
   data.charAt(data_index+4) === 't' && 
   data.charAt(data_index+5) === 'i' && 
   data.charAt(data_index+6) === 'o' && 
   data.charAt(data_index+7) === 'n' && 
   (data.charAt(data_index+8) === '\s' || data.charAt(data_index+8) === '\n' || data.charAt(data_index+8) === ' ' || data.charAt(data_index+8) === '(')
  ) { 
    return true;
  } else { 
    return false;
  }
}

//backtracking the regular function for the beginning of the build string

function back_track_regular(drop_off_index_reg) { 

  /*
   var a = async function() { } <--- 
   var a = +async function() { } <--- 
   var a = +    async function() { } <--- 
   when c is found, check for async, then check for character
   var a = +async +function() {} --- figure out if this is legal... i dont think it is. it doesnt compile so... im not going to add it in.. idk i have to figure it out
  */

  if(
   data.charAt(drop_off_index_reg) === 'c' && 
   take_five(drop_off_index_reg) === true && 
   regular_function_async_found === false && 
   regular_function_type_found === false && 
   regular_function_found_equals === false 
  ) {
   //then add the character here if it exists.... create another var. +,-,... if anything else not a real function. equals will be determined after
   bt_regular_parameter_string.unshift('c');
   bt_regular_parameter_string.unshift('n');
   bt_regular_parameter_string.unshift('y');
   bt_regular_parameter_string.unshift('s');
   bt_regular_parameter_string.unshift('a');
   drop_off_index_reg = drop_off_index_reg - 6; //change this to 7
   regular_function_async_found = true;
   return back_track_regular(drop_off_index_reg);
  }

  //check for characters right before function where async and equals doesnt exist..


}

function take_five(drop_off_index_reg) { 
  // backtrack starting from minice 5 here to check for characters. append '+,-,!...' and end
  if(
    (data.charAt(drop_off_index_reg-5) === ' ' || data.charAt(drop_off_index_reg-5) === '\s' || data.charAt(drop_off_index_reg-5) === '\n') && //or the characters and one behind is nothing, append the addititonal character '!' to async, !async
    data.charAt(drop_off_index_reg-4) === 'a' &&
    data.charAt(drop_off_index_reg-3) === 's' &&
    data.charAt(drop_off_index_reg-2) === 'y' &&
    data.charAt(drop_off_index_reg-1) === 'n' &&
    data.charAt(drop_off_index_reg  ) === 'c'
  ) { 
    return true;
  } else { 
    return false;
  }
}

/*
 use the array to build the beginning and whatever, change this comment after
*/

function get_declaration_type() { 

}

/*
 CHECK BEGINNING OF HTML SCRIPT ------------------------------------------- just check for strings here
*/

function recurse_check_script(html_end_script_data_index) { 
 
}

/*
 CHECK ENDING HTML SCRIPT
*/

function recurse_check_end_script(html_end_script_data_index_two) { 

}


/*
 PUSH THE FUNCTION -----------------------------------------------------
*/

function push_function() {

 exported_functions += 
  "{\n" + 
    `index: '${function_index}',\n` +
    "function_called: {\n" +
    "on: true,\n" +
    `description: 'filepath is ${fp} AND line number is ${function_line_number+1}',\n` +
    "parameters: [], \n" +
    `function: ${build_string}\n` +
   "},\n" + 
    "unit: {\n" +
     `${unit_configuration}\n` +
    "},\n" + 
   "},\n\n\n";

}

module.exports = generate;