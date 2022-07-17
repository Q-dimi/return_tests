var return_tests = require('../build');
const fs = require('fs');
var working_set = {};
var stop = true;
var in_loop = false;

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
                    working_set[key].errors.concat(return_tests.run(require(working_set[key].paths[i]))); //module functions
                } catch(err) { 
                    console.log(`error: FAILURE AT INDEX ${k}-${i}.\nmessage: ${err.message}`);
                }
            }

        }

    });

    in_loop = false;

    try {
        fs.writeFileSync('../errors.txt', JSON.stringify(working_set));
    } catch (err) {
        console.error(err);
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

    if(keys.length > 3) {
        throw new Error('object must have three keys');
    }

    keys.forEach((key, index) => {
        if(
          typeof(w[key].on) !== 'boolean' ||
          (typeof(w[key].paths) !== 'object' || Array.isArray(w[key].paths) === false) ||
          (typeof(w[key].errors) !== 'object' || Array.isArray(w[key].errors) === false)
        ) { 
          throw new Error('object must have on boolean, paths array and errors array');
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
    return;
}

function start_interval() { 
    stop = false;
    interval();
    return;
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