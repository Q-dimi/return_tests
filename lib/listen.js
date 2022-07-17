var return_tests = require('../build');
var loop_through_functions = {};
var stop = true;
var in_loop = false;

function interval() {

    if(stop === true) { 
        return;
    }

    in_loop = true;

    var keys = Object.keys(loop_through_functions);

    keys.forEach((key, index) => {
        if(loop_through_functions[key].on === true) { 
            for(let i = 0; i < loop_through_functions[key].paths.length; i++) { 
                try {
                    loop_through_functions[key].errors = return_tests.run(require(loop_through_functions[key].paths[i]));
                } catch(err) { 
                    console.log(`error: FAILURE AT INDEX ${k}-${i}.\nmessage: ${err.message}`);
                }
            }
        }
    });

    in_loop = false;

    setTimeout(function(){ 
        interval(); 
    }, 3000);

}

function set_working_set(w) { 

    if(typeof(w) !== 'object') { 
        return false;
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

    loop_through_functions = w; 

    return true;

}

function get_working_set(count) {

    if(count > 10) { 
        in_loop = false;
    }

    if(in_loop === false) {
        return loop_through_functions;
    }

    if(typeof(count) !== 'number') { 
        count = 0;
    } else { 
        count++;
    }

    setTimeout(function(count){ 
        get_working_set(count); 
    }, 100);

}

function stop_interval() { 
    stop = true;
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