  
  /* 

   Title: Function Strip
   Author: Alexander Eatman 
   License: MIT

   function strip searches selected folders/files and strips... 

   regular functions with brackets 
   arrow functions with brackets 
   arrow functions without brackets 

   function strip does not strip functions that are found inside strings, and comments. 

   function strip includes the line number, filepath and function name for each function.

   function strip will continue to add more types of functions to strip. Component based functions in react one of them. 

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
  * @param {line_number} the line number of the function
  * @param {function_types} types of functions being taken.... will try and cross reference react and whatever. also need to determine async.
  */

  var data_index = 0;
  var data = '';
  var data_length = 0;
  var exported_functions = 'module.exports = [ \n';
  var unit_configuration = [];
  var fp = '';
  var line_number = 0;
  var function_types = {
    regular: true, 
    arrow: true, 
    react_component: false
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
  */

  var in_string_outside_of_function = [];
  var in_string_outside_of_function_ = false;
  var in_comment_outside_function_single = false;
  var in_comment_type_outside_function_multi = false;

  /*
  * inside the function. Strings, single line and multiline comments are used to determine wheter a bracket should be added. Brackets determine function end.
  * @param {in_quotation_string} the array denoting when a string starts and stopes inside a function
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
  */

  var in_quotation_string = [];
  var in_string = false;
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

 /*
  recursing on every condition. Makes things easier to read.
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
  OUTSIDE FUNCTION - used for pushing pure functions
 */

 /*
  enter into a multiline comment outside the function. (if not in a multi-line comment, single-line comment, and string)
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
  return iterate_through_file_text(data_index);
 }

 /*
  exit a multiline comment outside the function. (if in a multi-line comment, not in a single-line comment, and not in a string) <-- dont need last two conditions but helps makes things more definitive
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
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a single line comment outside the function. (if not in a single-line comment, multi-line comment, and string)
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
  return iterate_through_file_text(data_index);
 }

 /*
  exit a single line comment outside the function (if in a single-line comment, not in a multi-line comment, and not in a string) <-- dont need last two conditions but helps makes things more definitive
 */

 if(
  in_comment_outside_function_single = true &&
  in_comment_type_outside_function_multi === false &&
  in_string_outside_of_function_ === false &&
  data.charAt(data_index) === '\n' && 
  in_function === false
 ) { 
  in_comment_outside_function_single = false;
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 /* 
  enter into a string outside the function (if not or in a string, single-line comment, and multi-line comment) whether im in or out of a string, 
 */

 if(
  in_string_outside_of_function_ === false || in_string_outside_of_function === true &&
  in_comment_outside_function_single === false &&
  in_comment_type_outside_function_multi === false &&
  data.charAt(data_index) === '"' || 
  data.charAt(data_index) === '`' || 
  data.charAt(data_index) === `'` && 
  in_function === false
 ) { 
  in_string_outside_of_function.push(data.charAt(data_index)); 
  in_string_outside_of_function_ = true;
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 }

 /*
  exit a string outside the function (if in a string, not in a single-line comment, and not in a multi-line comment) <-- dont need last two conditions but helps makes things more definitive
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
  data_index = data_index + 1; //hmm...? actually i guess this would be right? I think so
  return iterate_through_file_text(data_index);
 }

 /* 
  if in a string, multiline comment, or single line comment outside of the function, recurse up and dont build a function. Only one should be true
 */

 if(
  in_comment_type_outside_function_multi === true ||
  in_comment_outside_function_single === true ||
  in_string_outside_of_function_ === true && 
  in_function === false
 ) {
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 /*
  Enter into a regular function and start the build string. Above makes sure that the function below is built outside of a string, multiline comment and single line comment. So, I am getting the pure function when coming from the outside. When I do get a function, I ignore the outside, and focus on the inside. On the inside, I push every character, but dont run some conditions dependent on comments/strings. Once I hit this, im inside the function, and i simply just push every character and count brackets.
 */

 if(
  data.charAt(data_index-1) === ' ' ||
  data.charAt(data_index-1) === '\n' &&
  data.charAt(data_index  ) === 'f' && 
  data.charAt(data_index+1) === 'u' && 
  data.charAt(data_index+2) === 'n' && 
  data.charAt(data_index+3) === 'c' && 
  data.charAt(data_index+4) === 't' && 
  data.charAt(data_index+5) === 'i' && 
  data.charAt(data_index+6) === 'o' && 
  data.charAt(data_index+7) === 'n' && 
  data.charAt(data_index+8) === ' ' || 
  data.charAt(data_index+8) === '\n' && 
  in_function === false
 ) {
  enter_regular();
  return iterate_through_file_text(data_index);
 }

 /*
  enter into an arrow function and start the build string. sets to true and builds the build string.
 */

 else if(
  data.charAt(data_index-1) === ' ' || 
  data.charAt(data_index-1) === '\n' &&
  data.charAt(data_index  ) === '=' && 
  data.charAt(data_index+1) === '>' && 
  data.charAt(data_index+2) === ' ' || 
  data.charAt(data_index+2) === '\n' && 
  in_function === false
 ) {
  enter_arrow();
  return iterate_through_file_text(data_index);
 }

 /*
  if not in a string, multiline and single line comment and outside the function, where arrow and regular not found, move next
 */

 else if(in_function === false) { 
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a multiline comment inside the function. (if not in a multi-line comment, single-line comment, and string)
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
  return iterate_through_file_text(data_index);
 }

 /*
  exit a multiline comment inside the function. (if in a multi-line comment, not in a single-line comment, and not in a string) <-- dont need last two conditions but helps makes things more definitive
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
  return iterate_through_file_text(data_index);
 }

 /*
  enter into a single line comment inside the function. (if not in a single-line comment, multi-line comment, and string)
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
  return iterate_through_file_text(data_index);
 }

 /*
  exit a single line comment inside the function (if in a single-line comment, not in a multi-line comment, and not in a string) <-- dont need last two conditions but helps makes things more definitive
 */

 if(
  in_comment_inside_function_single = true &&
  in_comment_type_inside_function_multi === false &&
  in_string_inside_of_function_ === false &&
  data.charAt(data_index) === '\n' && 
  in_function === true
 ) { 
  in_comment_inside_function_single = false;
  build_string += data.charAt(data_index);
  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 }

 /* 
  enter into a string inside the function (if not or in a string, single-line comment, and multi-line comment) whether im in or out of a string, 
 */

 if(
  in_string_inside_of_function_ === false || in_string_inside_of_function === true &&
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false &&
  data.charAt(data_index) === '"' || 
  data.charAt(data_index) === '`' || 
  data.charAt(data_index) === `'` && 
  in_function === true
 ) { 
  in_string_inside_of_function.push(data.charAt(data_index)); 
  in_string_inside_of_function_ = true;
  build_string += data.charAt(data_index);
  data_index = data_index + 1;
  return iterate_through_file_text(data_index);
 }

 /*
  exit a string inside the function (if in a string, not in a single-line comment, and not in a multi-line comment) <-- dont need last two conditions but helps makes things more definitive
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
  data_index = data_index + 1; //hmm...?
  return iterate_through_file_text(data_index);
 }

 /*
  if not in a comment or string, keeping count of brackets so I know when to end the function
 */

 if(
   in_string_inside_of_function === false && 
   in_comment_inside_function_single === false &&
   in_comment_type_inside_function_multi === false &&
   data.charAt(data_index) === '{' && 
   in_function === true
 ) {
   opening_bracket += 1; 
   has_bracket = true;
 } else if(
   in_string_inside_of_function === false && 
   in_comment_inside_function_single === false &&
   in_comment_type_inside_function_multi === false && 
   data.charAt(data_index) === '}' && 
   in_function === true
 ) {
   closing_bracket += 1 
 }

 /* 
  pushing every data variable to the build_string, which is a function
 */

 build_string += data.charAt(data_index);

 /* 
  end creating the function.. dont need last three conditions, but helps make things clear
 */

 if(
  (is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n') || 
  (opening_bracket=== closing_bracket && opening_bracket > 1) && 
  in_function === true &&
  in_string_inside_of_function === false && 
  in_comment_inside_function_single === false &&
  in_comment_type_inside_function_multi === false
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
 build the parameters for the arrow function. have to backtrack characters starting with ")"
*/

function back_track_parameters(bt_index) { 

 /*
  i begin traversing a string inside a function parameter set
 */

 if(
  in_bt_string === false || in_bt_string === true &&
  data.charAt(bt_index) === '"' || 
  data.charAt(bt_index) === '`' || 
  data.charAt(bt_index) === `'`
 ) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index + 1;
  return back_track_parameters(bt_index);
 }

 /*
  i end traversing a string inside a function parameter set
 */

 if(
  in_bt_string === true &&
  in_bt_quotation_string.length > 1 && 
  in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0]
 ) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  return back_track_parameters(bt_index);
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
   immediately take async into consideration when c is found here - runs once
  */

  if(bt_af_is_async_check === false && data.charAt(bt_index_drop_off_function_name) === 'c' && bt_index_drop_off_found_first_character === false) {
   is_async(bt_index_drop_off_function_name);
   return get_arrow_parameter_function_name(bt_index_drop_off_function_name);
  }

  /*
    the function name has been appended because a space between the declaration type and function. Or the : if an object.
  */

  if(
   (bt_index_drop_off_found_first_character === true && (data.charAt(bt_index_drop_off_function_name) === ' ' || data.charAt(bt_index_drop_off_function_name) === ':')) ||
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
  if async exists add to the string... index remains the same for the next condition, which begins the function name
 */

function is_async(bt_index_drop_off_function_name) { 

 if(
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
  bt_index_drop_off_function_name = bt_index_drop_off_function_name - 5; 
 }

 bt_af_is_async_check = true;
 return;

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
 opening_bracket = 0; 
 closing_bracket = 0;

}

 /*
  reset namespace
 */

function file_end_reset_name_space(filepath) { 
  data_index = 0;
  data = fs.readFileSync(filepath, 'utf8');
  data_length = data.length;
  fp = '';
  line_number = 0;
  in_function = false;
  in_string_outside_of_function = [];
  in_string_outside_of_function_ = false;
  in_comment_outside_function_single = false;
  in_comment_type_outside_function_multi = false;
  in_quotation_string = [];
  in_string = false;
  opening_bracket = 0;
  closing_bracket = 0;
  build_string = '';
  function_index = 1;
  is_arrow = false;
  has_bracket = false;
  in_comment_inside_function_single = false;
  in_comment_type_inside_function_multi = false; 
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
}

/*
 entering into an arrow function
*/

function enter_arrow() { 
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
  back_track_parameters(bt_index);
  build_string += `${bt_arrow_parameter_string} =>`; 
  data_index = data_index + 3;
}

/*
 entering into a regular function
*/

function enter_regular() { 
  in_function = true;
  drop_off_index_reg = data_index - 2;
  build_string += back_track_async(drop_off_index_reg);
  data_index = data_index + 9;
  is_arrow = false;
}

/*
 determining if regular function is async function. May need some additonal checks
*/

function back_track_async(drop_off_index_reg) { 
  if(data.charAt(drop_off_index_reg) === 'c') { 
    if(take_five(drop_off_index_reg) === true) {
      return 'async function';
    } else { 
      return 'function';
    }
  } else if(data.charAt(drop_off_index_reg) === ' ') {
     drop_off_index_reg = drop_off_index_reg - 1;
     return back_track_async(drop_off_index_reg);
  } else { 
     return 'function';
  }
}

/*
 determining if async or regular
*/

function take_five(drop_off_index_reg) { 
  if(
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

module.exports = generate;