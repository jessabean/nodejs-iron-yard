// Use promises to
//* 1. read the sandwich directory to get a list of files inside
//* 2. then for each of the files, read the contents of each file
//* 3. object-ify the contents into a module-level list of games
const path = './sandwich';
let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let BBPromise = require('bluebird');
let readdir = BBPromise.promisify(fs.readdir);
let readFile = BBPromise.promisify(fs.readFile);
let express = require('express');
let games = [];
let app = express();

function createGameFromJson(json) {
  let data = JSON.parse(json);
  let game = new TicTacToeGame({humanFirst: data.humanFirst});
  game._board._state = data.board;
  return game;
} 

function addToGamesList(game) {
  games.push(game);
  return games;
}

readdir('./sandwich')
  .then(files => {
    let processedGames = [];
    for (let file of files) {
      let readFiles = readFile(`./sandwich/${file}`, 'utf8')
        .then(fileContents => createGameFromJson(fileContents))
        .then(game => addToGamesList(game))
        .catch(err => console.error(err));
      processedGames.push(readFiles);
    }
    return Promise.all(processedGames);
  })
  .then(() => console.log(games))
  .then(() => {
    let port = process.env.PORT || 8080;
    app.listen(port, () => console.log('Listening to port 8080'));
  })
  .catch(err => console.error(err));
