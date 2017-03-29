class Ajax {
  constructor(url) {
    this._url = url;
    this._thenChain = [];
    this._catchChain = [];
  }

  // Function to be called when Ajax request completes
  then(fn) {
    this._thenChain.push(fn);
    return this;
  }

  catch(fn) {
    this._catchChain.push(fn);
    return this;
  }

  get() {
    let xhr = new XMLHttpRequest();

         // (type, url, async: boolean)
    xhr.open('GET', this._url, true);
    
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // execute our then chain (array of functions)
          var data = JSON.parse(xhr.response);
          
          this._thenChain.forEach(function(callback) {
            data = callback(data);
          });

          // new in ES6: for...of, bound to value of each item in array
          // instead of for...each, which binds to index of each item
          //for (var callback of this._thenChain) { }

        } else if (xhr.status >= 400) {
          // execute our catch chain
          var err = {
            code: xhr.status,
            body: xhr.responseText,
            message: xhr.statusText
          };

          this._catchChain.forEach(function(callback) {
            err = callback(err);
          })
        }
      }
    });

    xhr.send();
  }
}
