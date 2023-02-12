var fs = require('file-system');
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
var bt_arrow_parameter_string = '';
var bt_index = 0;
var in_bt_quotation_string = [];
var in_bt_string = false;
var opening_bt_parentheses = []; //could say true or false for this because only two parenth
var closing_bt_parentheses = []; //could say true or false with this because only two parenth

function generate(folders, file_to_generate, unit) {

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
    data_index = 0;
    in_quotation_string = [];
    in_string = false;
    opening_bracket = []; 
    closing_bracket = [];
    build_string = '';
    fp = filepath;
    bt_arrow_parameter_string = '';
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
 var error = 'functions have been successfully copied';

 try {
  fs.writeFileSync(filepath, exported_functions);
 } catch(err) { 
  error = error.message;
 }

 return error;

}

function iterate_through_file_text(data_index) {

    try { 
     var test_definiion_on_file_end = data.charAt(index);
    } catch(err) { 
     return;
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
     build_string += 'function';
     data_index = data_index + 8;
     return iterate_through_file_text(data_index);
    }

    if(data.charAt(data_index) === '=' && data.charAt(data_index + 1) === '>') {
     bt_arrow_parameter_string = '';
     bt_index = data_index - 1;
     in_bt_quotation_string = [];
     in_bt_string = false;
     opening_bt_parentheses = [];
     closing_bt_parentheses = [];
     back_track_parameters(bt_index);
     build_string = `${bt_arrow_parameter_string} =>`;
     data_index = data_index + 2;
     return iterate_through_file_text(data_index);
    }

    if(
     data.charAt(data_index) === "'" || 
     data.charAt(data_index) === '`' || 
     data.charAt(data_index) === `'`
    ) { 
     in_quotation_string.push(data.charAt(data_index)); 
     in_string = true;
    }

    if(
     in_quotation_string.length > 0 && 
     in_quotation_string[in_quotation_string.length - 1] === in_quotation_string[0]
    ) { 
     in_quotation_string = [];
     in_string = false;
    }

    if(in_string === false && data.charAt(data_index) === '{') { 
     opening_bracket.push('{');
    } else if(in_string === false && data.charAt(data_index) === '}') { 
     closing_bracket.push('}');
    }
    
    build_string += data.charAt(data_index);

    if(opening_bracket.length === closing_bracket.length) { 

     var ug = build_unit_configuration();

     exported_functions += (`
      { 
        index: '${function_index}',
        function_called: {
          on: true,
          description: '${fp}',
          parameters: [],
          function: ${build_string}
        }, 
        unit: { 
          ${ug}
        }, 
      },
     `);

     function_index = function_index + 1;
     build_string = '';
     
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
     },`; //dont need this on last
 }

 return ug_return;

}

function back_track_parameters(bt_index) { 

 if(
  data.charAt(bt_index) === "'" || 
  data.charAt(bt_index) === '`' || 
  data.charAt(bt_index) === `'`
 ) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
 }

 if(
  in_bt_quotation_string.length > 0 && 
  in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0]
 ) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
 }

 if(in_bt_string === false && data.charAt(bt_index) === ')') {
  closing_bt_parentheses.push(')');
 } else if(in_bt_string === false && data.charAt(bt_index) === '(') { 
  opening_bt_parentheses.push('(');
 }

 bt_arrow_parameter_string += data.charAt(bt_index);

 if(closing_bt_parentheses.length === opening_bt_parentheses.length) { //should be one for each... return the string
  return bt_arrow_parameter_string;
 }

 bt_index = bt_index - 1;

 return back_track_parameters(bt_index);

} 

module.exports = generate; 