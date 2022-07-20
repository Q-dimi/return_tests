function format(string_object) {
 switch(string_object.id) { 
  case 'startString':
   return `\nERROR\nfunction index: ${string_object.function_index} (${string_object.function_index_name})\nparameter index: ${string_object.parameter_index}\n`;
  case 'executionTime':
    return `function and test execution time: ${string_object.ms}ms\n`;
  case 'functionDescription':
    return `function description: ${string_object.description}\n`;
  case 'greaterThanErrorAll':
   return `greaterThanError: '${string_object.return_value}' is less than all of the values in the array '${string_object.compared_to}'\n`;
  case 'greaterThanErrorOne':
   return `greaterThanError: '${string_object.return_value}' is less than '${string_object.compared_to}'\n`;
  case 'inRangeErrorAll':
   return `inRangeError: '${string_object.return_value}' is not in the range of all the sets in the array '${string_object.compared_to}'\n`;
  case 'inRangeErrorOne':
   return `inRangeError: '${string_object.return_value}' is not in the range '${string_object.compared_to}'\n`;
  case 'lessThanErrorAll': 
   return `lessThanError: '${string_object.return_value}' is more than all of the values in the array '${string_object.compared_to}'\n`;
  case 'lessThanErrorOne':
   return `lessThanError: '${string_object.return_value}' is more than '${string_object.compared_to}'\n`;
  case 'regexErrorAll':
   return `regex error: '${string_object.return_value}' does not pass '${string_object.compared_to} (index ${string_object.index})'\n`;
  case 'regexErrorOne':
   return `regex error: '${string_object.return_value}' does not pass '${string_object.compared_to}'\n`;
  case 'valueErrorAll':
   return `value error: '${string_object.return_value}' is not in the array of allowed values '${string_object.compared_to}'\n`;
  case 'valueErrorOne':
   return `value error: '${string_object.return_value}' does not match the allowed value '${string_object.compared_to}'\n`;
  case 'valueErrorAllObject':
   return `value error: '${string_object.return_value}' is not in the array of allowed values '${string_object.compared_to}'\n`;
  case 'valueErrorOneObject':
   return `value error: '${string_object.return_value}' does not match the allowed value '${string_object.compared_to}'\n`;
  case 'typeErrorAll':
   return `type error: '${string_object.return_value}' is not in the array of allowed types '${string_object.compared_to}'\n`;
  case 'typeErrorOne':
   return `type error: '${string_object.return_value}' does not match the allowed type '${string_object.compared_to}'\n`;
   case 'evenOrOddErrorAll': 
   return `even or odd error: ${string_object.return_value % 2 === 0 ? `even return value '${string_object.return_value}' was compared to an 'odd' string in ` : `odd return value '${string_object.return_value}' was compared to an 'even' string in `} the array '${string_object.compared_to}'\n`;
  case 'evenOrOddErrorOne':
    return `even or odd error: ${string_object.return_value % 2 === 0 ? `even return value '${string_object.return_value}' was compared to an '${string_object.compared_to}' string` : `odd return value '${string_object.return_value}' was compared to an '${string_object.compared_to}' string`}\n`;
  }
}
module.exports = format;