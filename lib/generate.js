var fs = require('file-system');

function generate(folders, file_to_generate) {

 if(
  typeof(folders) !== 'object' || 
  Array.isArray(folders) == false
 ) { 
  throw new Error('an array was not passed');
 }

 var exported_functions = [];

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
    iterate_through_file_text(filepath, exported_functions); 
   }
  })

 }

 generate_file(exported_functions, file_to_generate);

}

function iterate_through_file_text(filepath, exported_functions) { 

 var data = fs.readFileSync(filepath, 'utf8').trim();

 for(let i = 0; i < data.length; i++) { 

    if(
     data.charat(i) === 'f' &&
     data.charat(i+1) === 'u' &&
     data.charat(i+2) === 'n' &&
     data.charat(i+3) === 'c' &&
     data.charat(i+4) === 't' &&
     data.charat(i+5) === 'i' &&
     data.charat(i+6) === 'o' &&
     data.charat(i+7) === 'n' || 
     data.charat(i) === '=' &&
     data.charat(i+1) === '>'
    ) {

     var in_quotation = false; //measue whether in quotations for ' "  `
     var opening_bracket = []; //same length on each push to file
     var closing_bracket = []; //same length on each push to file
     var parentheses_parameters = ''; // just create a parentheses string of parameter names and push this to below. i am drunk i will do this tomorrow...convert this to the string below... who is mr young hobbit sam thaa. who is mr young hobbit sam thaaa. show yourself. this is ganandolf. do this for me without the brackets.
     var accurate_string = ''; //string representation of function with new lines (spacing) taken into consideration and pacing

     while(true) { 
      
      if(data.charAt(i) == '\n') { 
        //new linw in string
      }

      i = i + 1;

     }

    }

 }

}

function generate_file(exported_functions, file_to_generate) { 

 for(let i = 0; i < exported_functions.length; i++) { 
  
  

 }

}

module.exports = generate; 