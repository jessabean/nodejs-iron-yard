class Button {
  constructor() {
    this._button = document.createElement('button');
  }
  // equivalent to:
  // function Button() {
  //   this._button = document.createElement('button');
  // }

  get text() {
    return this._button.innerHTML;
  }

  set text(value) {
    this._button.innerHTML = value;
  }

  render() {
    return this._button;
  }
  // equivalent to:
  // Button.prototype.render = function() {
  //   return this._button;
  // }

  on(name, callback) {
   this._button.addEventListener(name, function(){
    // `this` is the <button> element
    console.log(name);
    // the callback (function() {...}) is unaware of `this`
    // so we have to bind `this` to the callback
    callback.call(this);
   });
  }
}

// create a new instance of a Button
var button = new Button();
button.text = 'Hi, Jess';

// render button in DOM
document.body.appendChild(button.render());

button.on('click', function() {
  this.style.color = 'purple';
});

new Ajax('http://ip.jsontest.com/')
  .then( x => console.log(x.ip))
  .then( u => console.log('undefined?', u))
  .catch( e => {
    // multi line arrow function has curly braces and needs
    // a return statement to return a value.
    console.error(e);
    return 'I give up.';
  })
  .catch( x => alert(x))
  .get();
