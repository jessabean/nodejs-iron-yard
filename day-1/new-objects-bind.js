// EXAMPLE: recreating a console.log function with `bind`
var log = console.log;

// console is an object
// console.log is a method (a function) on the console object
// var log represents the function object

console.log(log.toString());
// > function log() { [native code] }

log('With great power, blaaah');

// ^^ this is supposed to be broken, but browsers fixed it. 
// on to example 2...
