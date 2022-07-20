var return_tests = require('../index');

return_tests.live_changes.set_working_set({ 
 index_a: { on: true, paths: ['../example/functions.js'] },
 index_b: { on: true, paths: ['../example/functions.js'] } 
});

try {
 return_tests.live_changes.start_interval();
} catch(err) { 
 console.log(err.message)
} 
