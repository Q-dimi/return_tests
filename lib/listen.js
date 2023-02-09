var run = require('../build');
const fs = require('file-system');
var working_set = {};
var stop = true;
var in_loop = false;
var i = 1;

function interval() {

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
    var errors = run(functions);
    working_set[key].errors = working_set[key].errors.concat(errors);
   }
  }
 });

 i++;

 if(i === 4) { 
    i = 1;
 }

 keys.forEach((key, index) => {
  if(working_set[key].on === true) { 
   var file_string = `<html><head></head><body>`;
   file_string += `<br>listening for changes in WORKING SET ${key} (${i === 1 ? '🥶' : i === 2 ? '😱' : i === 3 ? '😨' : '👽'})<br><br>`
   file_string += `<br>PATHS: ${JSON.stringify(working_set[key].paths)} <br><br>`;
    for(let i = 0; i < working_set[key].errors.length; i++) { 
     file_string += working_set[key].errors[i].split('\n').join('<br>');
     file_string += '<br>';
    }
   file_string += `<script>setTimeout(function(){location.reload();},3000);</script></body></html>`; 
   fs.writeFileSync(`./pages/${key}.html`, file_string);
  }
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
   typeof(w[key].paths) !== 'object' || 
   Array.isArray(w[key].paths) === false
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
 if(stop === false) { 
  return 'interval already running';
 }
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