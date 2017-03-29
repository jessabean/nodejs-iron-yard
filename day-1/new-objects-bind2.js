var booton = new Button();
var renderFn = booton.render;

// document.body.appendChild(renderFn());
// > Uncaught TypeError: Cannot read property '_button' of undefined
//
// orphaned the `render` function from the object that it lived in
// i.e., the `constructor` function on Button in app.js
// in renderFn example, `this` has no value


// bind is a method on a function object that returns a function 
// with `this` bound and (optionally) some arguments replaced
var boundRenderFn = renderFn.bind(booton);
document.body.appendChild(boundRenderFn());

// now using `bind` to attach `render` function to booton
// and give `this` some value 
