// 'use strict';

function printThis() {
  console.log(this);
  this.message = 'I am a good person';
}

printThis();

// At this point in code, we have 2 objects:
// 1. Window
// 2. printThis
//
// console.log(typeof printThis); 
// > function i.e., function object
//
// window.message
// > 'I am a good person'

var o = new printThis();
console.log(o);

// The new operator changes the way that printThis is invoked.
// Changes what `this` is
// 1. Creates a brand new object that is empty, binds it to `this`
// 2. Runs printThis() with the new `this`
// 3. Returns the new object
//
// console.log(o)
// > printThis { message: 'I am a good person' }



// EXAMPLE: recreating a constructor function with `call`
function myNew(fnConstructor) {
  // 1. bind this
  var o = {};

  // 2.  run the function
  // Three ways to run fnConstructor and bind `this`: 
  // call, apply, bind
  // the first argument passed to call/apply/bind will always be `this`
  fnConstructor.call(o);

  // 3. return the new object
  return o;
}

var otherO = myNew(printThis);
// console.log(otherO);
// > Object { message: 'I am a good person' }



