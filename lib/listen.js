/**
 * runs an interval and writes errors to a file with each key as the name of the html file
 * 
 * @param {Object} working_set The object containing the errors displayed on pages '/pages/key.html'
 * @param {Boolean} stop The variable responsoble for starting and stopping the interval
 * @param {Boolean} in_loop Whether in the loop or not. used for reinstantiating the working set
*/

var return_tests = require('../build');
const fs = require('file-system');
var working_set = {};
var stop = true;
var in_loop = false;

function interval() {

 console.log('listening for changes in node_modules/return-tests/pages/html...')

 if(stop === true) { 
  return;
 }

 in_loop = true;
 var keys = Object.keys(working_set);

 keys.forEach((key, index) => {
  if(working_set[key].on === true) { 
   working_set[key].errors = [];
   for(let i = 0; i < working_set[key].paths.length; i++) {
    var functions = require(working_set[key].paths[i]);
    var errors = return_tests.run(functions);
    working_set[key].errors = working_set[key].errors.concat(errors);
   }
  }
 });

 keys.forEach((key, index) => {
  var file_string = `<html><head></head><body>`;
  file_string += `<br>listening for changes (random emoji) <br><br>`
  file_string += `<br>${JSON.stringify(working_set[key].paths)} <br><br>`;
  if(working_set[key].on === true) { 
   for(let i = 0; i < working_set[key].errors.length; i++) { 
    file_string += working_set[key].errors[i].split('\n').join('<br>');
    file_string += '<br>';
   }
  }
  file_string += `<script>setTimeout(function(){location.reload();},3000);</script></body></html>`;
  fs.writeFileSync(`./pages/${key}.html`, file_string);
 });

 in_loop = false;
   
 setTimeout(function() { 
  interval(); 
 }, 3000);

}

function set_working_set(w) { 

 if(typeof(w) !== 'object') { 
  throw new Error('must be object');
 }

 var keys = Object.keys(w);

 keys.forEach((key, index) => {
  if(
   typeof(w[key].on) !== 'boolean' ||
   (typeof(w[key].paths) !== 'object' || Array.isArray(w[key].paths) === false) ||
   (typeof(w[key].errors) !== 'object' || Array.isArray(w[key].errors) === false)
  ) { 
   throw new Error(`
    object must have keys 
    containing on boolean, 
    paths array and errors array
   `);
  }
 });

 if(in_loop === false) { 
  return working_set = w;
 }

 setTimeout(function(w) { 
  set_working_set(w); 
 }, 100);

}

function get_working_set() {
 return working_set;
}

function stop_interval() { 
 stop = true;
 in_loop = false;
 return 'interval stopped';
}

function start_interval() { 
 stop = false;
 interval();
 return 'interval started';
}

function interval_status() { 
 return stop === true ? 'off' : 'on';
}

module.exports = { 
 get_working_set: get_working_set,
 set_working_set: set_working_set,
 stop_interval: stop_interval, 
 start_interval: start_interval, 
 interval_status: interval_status, 
}