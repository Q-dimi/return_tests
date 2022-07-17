var live_changes = require('../lib/listen');
live_changes.set_working_set({ index_a: { on: true, paths: ['../example/functions.js'], errors: [] } });
live_changes.set_working_set({ index_b: { on: true, paths: ['../example/functions.js'], errors: [] } });
console.log(live_changes.get_working_set());
live_changes.start_interval();
console.log(live_changes.interval_status());
//live_changes.stop_interval();