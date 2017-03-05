const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Game = require('./src/game.js');


const app = express();
const root = `${__dirname}/public`;

// parsing data and serving public files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(root));

var game = new Game();
// console.log(game.print());

app.post("/click", function(req, res) {
  var coor = req.body.coor.map((str) => Number(str));
  var player = Number(req.body.player);
  console.log('player', player, coor);

  var i = coor[0];
  var j = coor[1];
  var validClick = game.clickBoard(player, i, j);

  if (validClick) {
    res.send(200, game);
    game.switchBoards();
  } else {
    res.send(500)
  }
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening to port number " + port);
