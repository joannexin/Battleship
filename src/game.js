const Board = require('./board.js');

const Game = function() {
  this.board1 = new Board(1);
  this.board2 = new Board(2);
  this.boards = [this.board1, this.board2];
};

Game.prototype.switchBoards = function() {
  this.boards.reverse();
};

Game.prototype.currentBoard = function() {
  return this.boards[0];
};

Game.prototype.clickBoard = function(player, i, j) {
  if (player !== this.currentBoard().player) {
    return false;
  }
  var validClick = this.currentBoard().gridHit(i, j);
  var winner = this.win();
  if (winner) {
    console.log("player " + player + " won!!!");
  } else {
    this.print();
  }
  return validClick;
};

Game.prototype.win = function() {
  var win = true;
  var checker = this.currentBoard().ships;
  for (var i = 0; i < checker.length; i++) {
    if (!checker[i].sunk) {
      return false;
    }
  }
  return win;
};

Game.prototype.print = function() {
  for (var i = 0; i < this.boards[0].grid.length; i++) {
    console.log(`|${this.board1.grid[i].map(sq => sq.show).join("|")}|        |${this.board2.grid[i].map(sq => sq.show).join("|")}|`);
  }
};

module.exports = Game;
