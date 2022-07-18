function format(string_object) { 
 switch(string_object.id) { 
  case 'greaterThanErrorAll':
   return `greaterThanError: '${string_object.return_value}' is less than all of the values in the array '${string_object.compared_to}'\n`;
  case 'greaterThanErrorOne':
   return `greaterThanError: '${string_object.return_value}' is less than '${string_object.compared_to}'\n`;
  case 'inRangeErrorAll':
   return `inRangeError: '${string_object.return_value}' is not in the range of all the sets in the array '${string_object.compared_to}'\n`;
  case 'inRangeErrorOne':
   return `inRangeError: '${string_object.return_value}' is not in the range '${string_object.compared_to}'\n`;


  break;
 }
}
module.exports = format;