// Use promises to
//* 1. read the sandwich directory to get a list of files inside
//* 2. then for each of the files, read the contents of each file
//* 3. object-ify the contents into a module-level list of games
const path = './sandwich';
let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let BBPromise = require('bluebird');
let bodyParser = require('body-parser');
let readdir = BBPromise.promisify(fs.readdir);
let readFile = BBPromise.promisify(fs.readFile);
let express = require('express');
let nunjucks = require('nunjucks');
let games = [];

// Server config
let app = express();

// Nunjucks config
nunjucks.configure('templates', {
  autoescape: true,
  watch: true,
  express: app
});

// application middleware
// 3 arguments: request handler
app.use(function(request, response, next) {
  console.log('A request went by', request.path);
  next();     // go to the next middleware
});

// 4 arguments: error request handler
app.use(function(error, request, response, next) {
  console.error('Something bad happened', request.path, error);
  next(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Tell server what to do when it GETs '/'
app.get('/', function(request, response){  
  response.render('index.html', {
    message: 'This is my message',
    games: globalGames
  });
});

// Add path for each game based on game index
app.get('/:gameIndex', function(request, response){
  let gameIndex = Number.parseInt(request.params.gameIndex);

  if(Number.isNaN(gameIndex) || !globalGames[gameIndex]) {
    return response.redirect('/');
  } 
  response.render('game.html', {
    gameIndex: gameIndex,
    game: globalGames[gameIndex]
  });
});

app.post('/:gameIndex', (request, response) => {
  let { row, col } = request.body;
  let gameIndex = request.params.gameIndex;
  globalGames[gameIndex]
    .play(Number.parseInt(row), Number.parseInt(col));
  response.redirect(`/${gameIndex}`);
});

let globalGames = [];

// Code to read game files
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
  .then(() => {
    let port = process.env.PORT || 8080;
    globalGames = games;
    app.listen(port, () => console.log('Listening to port 8080'));
  })
  .catch(err => console.error(err));
