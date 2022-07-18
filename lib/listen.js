var return_tests = require('../build');
const fs = require('file-system');
var working_set = {};
var stop = true;
var in_loop = false;
var listening = '.';

function interval() {

    console.log('listening for updates...');

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

                    if(typeof(functions) !== 'object' || Array.isArray(functions) === false) {
                        throw new Error(`
                            error: FAILURE AT INDEX ${key} PATH INDEX ${i}.\n
                            error: Functions not an array\n
                        `);
                    }

                    var errors = return_tests.run(functions);
                    working_set[key].errors = working_set[key].errors.concat(errors); //attach the path here

                } catch(err) { 

                    throw new Error(`
                        error: FAILURE AT INDEX ${key} PATH INDEX ${i}.\n
                        error: ${err.message}`
                    );

                }

            }
            
        }

    });

    if(listening === '.') { 
        listening = '..';
    } else if(listening === '..') { 
        listening = '...';
    } else { 
        listening = '.';
    }

    keys.forEach((key, index) => {

        var file_string = `
        <html>
        <head></head>
        <body>`;

        file_string += `<br>listening for changes${listening}<br><br>`

        if(working_set[key].on === true) { 
            for(let i = 0; i < working_set[key].errors.length; i++) { 
                file_string += working_set[key].errors[i].split('/').join('<br>');
                file_string += '<br>';
            }
        }
        
        file_string += `
        <script>
        setTimeout(function() { location.reload(); }, 3000);
        </script>
        </body>
        </html>`;

        try {
            fs.writeFileSync(`./pages/${key}.html`, file_string);
        } catch (err) {
            console.log(err);
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

function empty_pages_folder() { 
    //go to pages folder and delete everything
}

module.exports = { 
    get_working_set: get_working_set,
    set_working_set: set_working_set,
    stop_interval: stop_interval, 
    start_interval: start_interval, 
    interval_status: interval_status, 
}