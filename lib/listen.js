var return_tests = require('../build');
const fs = require('file-system');
var working_set = {};
var stop = true;
var in_loop = false;
var listening = '.';

function interval() {

    if(stop === true) { 
        return;
    }

    in_loop = true;

    var keys = Object.keys(working_set);

    keys.forEach((key, index) => {

        if(
            typeof(working_set[key].on) !== 'boolean' ||
            (typeof(working_set[key].paths) !== 'object' || Array.isArray(working_set[key].paths) === false) ||
            (typeof(working_set[key].errors) !== 'object' || Array.isArray(working_set[key].errors) === false)
        ) { 
            throw new Error('object must have on boolean, paths array and errors array');
        }

        if(working_set[key].on === true) { 

            working_set[key].errors = [];

            for(let i = 0; i < working_set[key].paths.length; i++) { 
                try {
                    var functions = require(working_set[key].paths[i]);
                    var errors = return_tests.run(functions);
                    working_set[key].errors[0] = working_set[key].paths[i];
                    working_set[key].errors = working_set[key].errors.concat(errors); //attach the path to the error
                } catch(err) { 
                    console.log(`error: FAILURE AT INDEX ${k}-${i}.\nmessage: ${err.message}`);
                }
            }

        }

    });

    in_loop = false;

    var file_string = '';

    if(listening === '.') { 
        listening = '..';
    }

    if(listening === '..') { 
        listening = '...';
    }

    if(listening === '...') { 
        listening = '.';
    }

    file_string += `\nlistening for changes${listening}\n`; //how to keep a file refreshing

    keys.forEach((key, index) => {
        if(working_set[key].on === true) { 
            for(let i = 1; i < working_set[key].errors.length; i++) { 
                file_string += working_set[key].errors[i];
                file_string += 'path: ' + working_set[key].errors[0];
                file_string += '\n';
            }
        }
    });

    try {
        fs.writeFileSync('./errors.txt', file_string); 
    } catch (err) {
        console.log(err);
    }
      
    setTimeout(function(){ 
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
          throw new Error('object must have keys containing on boolean, paths array and errors array');
        }
    });

    if(in_loop === false) { 
        working_set = w;
        return;
    }

    setTimeout(function(w) { 
        set_working_set(w); 
    }, 100);
    
}

function get_working_set() {

    if(in_loop === false) {
        return working_set;
    }

    setTimeout(function() { 
        get_working_set(); 
    }, 100);

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