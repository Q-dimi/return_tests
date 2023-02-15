module.exports = { 

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

    data_index:  0,
    data: '',
    data_length: 0,
    exported_functions: 'module.exports = [ \n',
    unit_configuration: [],
    fp: '',
    line_number: 0,

    /*

    * denoting inside or outside the function, for reading and acting.. can rid some conditions here

    * @param {in_function} if in function or not in function for operations

    */

    in_function: false,

    /*

    * outside the function

    * @param {in_string_outside_of_function} the array denoting when a string starts and stopes outside a function
    * @param {in_string_outside_of_function_} compliment of above. on or off signifies not to execute some conditions
    * @param {in_comment_outside_function_single} denoting if i am in a single line comment outide the function
    * @param {in_comment_type_outside_function_multi} tracking multiline comments outside function... could use a count here and not an array..
    * @param {in_comment_type_outside_function_multi_} compliment of above. signifies whether to execute some conditions
    
    */

    in_string_outside_of_function: [],
    in_string_outside_of_function_: false,
    in_comment_outside_function_single: false,
    in_comment_type_outside_function_multi: [],
    in_comment_type_outside_function_multi_: false,

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

    in_quotation_string: [],
    in_string: false,
    opening_bracket: [],
    closing_bracket: [],
    build_string: '',
    function_index: 1,
    is_arrow: false,
    has_bracket: false,
    in_comment_inside_function_single: false, 
    in_comment_type_inside_function_multi: [], 
    in_comment_type_inside_function_multi_: false, 

    /*

    * recursing arrow function parameters and the drop off for the arrow function name

    * @param {bt_arrow_parameter_string} the parameters of the arrow function. built via an array, and joined as a string
    * @param {bt_index} the back tracking of an index
    * @param {bt_index_drop_off_function_name} the index that backtracks the arrow function name. definition used for ending
    * @param {bt_index_drop_off_alphabet} once the first character is hit, set below to on
    * @param {bt_index_drop_off_found_first_character} once on, when first space or new line hit, end and return the name and function parameters
    * @param {in_bt_quotation_string} in and out of a string within the parameter set
    * @param {in_bt_string} compliment of above. denotes in and out of a string within the parameter set
    * @param {opening_bt_parentheses} opening parentheses used for ending. could use count
    * @param {closing_bt_parentheses} closing parentheses used for ending. could use count.
    
    */

    bt_arrow_parameter_string: [],
    bt_index: 0,
    bt_index_drop_off_function_name: 0,
    bt_index_drop_off_alphabet: /^[a-zA-Z]*$/,
    bt_index_drop_off_found_first_character: false, 
    in_bt_quotation_string: [],
    in_bt_string: false,
    opening_bt_parentheses: [],
    closing_bt_parentheses: []

}