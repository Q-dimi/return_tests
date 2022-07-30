# compare-an-object

This is a function that can compare two objects in any order at their deepest level and return the deleted items, changed items, added items and whether they are both equal with high accuracy. (takes two object or two arrays)

```
npm i compare-an-object
```

```js
const compare = require("compare-an-object");

var result;

try {
  result = compare({ a: 4 }, { a: 4, b: 5 }); // can take [],[] or {},{}
} catch (err) {
  result = err.message;
}

if (typeof result === "object") {
  //result.added = array of added values
  //result.changed = array of changed values
  //result.deleted = array of deleted values
  //result.same is a boolean showing if they are the same or not
  //result.error is a boolean showing if there was an error in execution
  //result.error_message is the error message associated with the error
} else {
  //get 'result' err.message string
}
```

# Returned Parameters

Object: the object containing the changed, deleted and added values
<br>
<br>
Object.added: the array of added values (JSON string format)
<br>
<br>
Object.deleted: the array of deleted values (JSON string format)
<br>
<br>
Object.changed: the array of changed values (object containing 'a' for base and 'b' for changed) (JSON string format)
<br>
<br>
Object.same: boolean of true or false showing if both objects are the same
<br>
<br>
Object.error: boolean showing if there was an error in execution
<br>
<br>
Object.error_message: the error message if there was an error

# JSON String Params

path: The path you are currently in and their type (array or object)
<br>
<br>
key: The key you are currently pointing to
<br>
<br>
type: the type of the value for that key
<br>
<br>
value: the value at that key
<br>
<br>
index: the crrent index where the value is if it is in an array
<br>
<br>
index_set: [123,[2,3,4,[3,4,5]]], tracks how many levels at each index you are inside of an array - (1,3) for value 5
<br>
<br>
l_deep: tracks how many levels you are inside of an array. (3 levels deep)
<br>
<br>
currently_inside_of: what you are currently inside of (object or array)

# Additional

(Does not support WeakSet and WeakMap as enumerable objects (accepts as values)) Sets are converted to arrays. Maps converted to objects.
