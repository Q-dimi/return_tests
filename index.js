var run = require('./build');
var listen = require('./lib/listen');
var generate_functions = require('./lib/generate');
module.exports = { 
    run: run, 
    generate_functions: generate_functions,
    live_changes: listen

}