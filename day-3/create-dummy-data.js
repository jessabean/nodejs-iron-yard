let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let BBPromise = require('bluebird');
let writeFile = BBPromise.promisify(fs.writeFile);

let mkdir = function(path) {
  return new Promise((good, bad) => {
    fs.mkdir(path, err => {
      if (err && err.code !== 'EEXIST') {
        // if you just run bad(), it can still exit if statement and then good() can run too
        // e.g., `bad(err);`
        // so it is better/idiomatic to `return bad(err);`
        // to guarantee that there is a break
        return bad(err);
      }
      good();
    });
  });
};

function makeNewGame() {
  let game = new TicTacToeGame();
  let col = Math.floor(Math.random() * 3);
  let row = Math.floor(Math.random() * 3);
  game.play(row, col);

  return game;  
}
// game is argument that is passed to second `then` below

let promise = mkdir('./sandwich');

for (let i of [1, 2]) { // add chain of file creation twice
  promise = promise
    .then(() => makeNewGame()) // returns a new TicTacToeGame()
    .then(game => game.toJson()) // takes the game and returns json stringified
    .then((json) => {
       return {
         fileName: `./sandwich/${new Date().valueOf()}.json`,
         data: json
       };
     })
     .then(({ fileName, data }) => writeFile(fileName, data)) // writes the file
}
promise.catch(err => console.error(err));
