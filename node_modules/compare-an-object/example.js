const compare = require('./index');

var a = { 
    a: 1,
    v: [{a: { b: [1,2,3,{ a: 6}]}}, {a: 3}], 
    b: [1,2,3,4,5,{a: { a: 23, b: 55 }},6,77], 
    c: { 
        a: 44, 
        b: new Boolean(true), 
        d: { a: 32, b:98 }
    }
}

var b = { 
    a: 1, 
    v: [{a: { b: [1,2,3,{a: 6}]}}, {a: 3}], 
    b: [1,2,3,4,5,{a: { a: 23, b: 55 }},6,7], 
    c: { 
        a: 44, 
        b: new Boolean(true),
        d: { a: 32, b:98 }
    }
}

// a = [{a:4},{a:8}]
// b = [{a:4},{a:8}]

var result;

try {
 result = compare(a,b);
} catch(err) { 
 result = err.message;
}


if (typeof result === "object") {
    console.log(result);
//result.added = array of added values
//result.changed = array of changed values
//result.deleted = array of deleted values
//result.same is a boolean showing if they are the same or not
//result.error is a boolean showing if there was an error in execution
//result.error_message is the error message associated with the error  console.log(result);
} else {
  //get 'result' err.message string
}

