var live_changes = require('../lib/listen');
live_changes.set_working_set({ index_a: { on: true, paths: ['../example/functions.js'], errors: [] } });
console.log(live_changes.get_working_set());
live_changes.start_interval();
console.log(live_changes.interval_status());
// console.log(live_changes.stop_interval());