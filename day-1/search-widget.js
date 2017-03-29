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
