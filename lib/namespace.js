module.exports = {

    /*
        data about the file. line_number and fp used in the build string description
    */

    data_index:  0,
    data: '',
    exported_functions: 'module.exports: [ \n',
    unit_configuration: [],
    fp: '',
    line_number: 0,

    /*
       denoting inside or outside the function, for reading and acting.. can rid some conditions here
    */

    in_function: false,


    /*
        outside the function
    */

    in_string_outside_of_function: [],
    in_string_outside_of_function_: false,
    in_comment_outside_function_single: false,
    in_comment_type_outside_function_multi: [],
    in_comment_type_outside_function_multi_: false,

    /*
        inside the function
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
        recursing arrow function parameters
    */

    bt_arrow_parameter_string: [],
    bt_index: 0,
    in_bt_quotation_string: [],
    in_bt_string: false,
    opening_bt_parentheses: [],
    closing_bt_parentheses: []

}