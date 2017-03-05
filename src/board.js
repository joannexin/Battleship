const Square = require('./square.js');

const Board = function(player) {
  this.player = player;
  this.grid = this.createGrid();
  this.newlySunkedShip = null;

  this.ships = [
    { name: 'destroyer', coors: this.generateShip(), sunk: false },
    { name: 'scout', coors: this.generateShip(), sunk: false }
  ]
  this.placeShips();
};

Board.prototype.createGrid = function() {
  var grid = [];
  for (var i = 0; i < 10; i++) {
    grid[i] = [];
    for (var j = 0; j < 10; j++) {
      grid[i][j] = new Square();
    }
  }
  return grid;
};

Board.prototype.gridHit = function(i, j) {
  var validClick = this.grid[i][j].hit();
  this.newlySunkedShip = null;
  this.newlySunkedShip = this.anyShipNewlySunk();
  return validClick;
};

Board.prototype.generateShip = function() {
  var direction = Math.floor(Math.random() * 2);
  var row;
  var col;

  if (direction === 1) {
    row = Math.floor(Math.random() * 10);
	  col = Math.floor(Math.random() * (10 - 3 + 1));
  } else {
    row = Math.floor(Math.random() * (10 - 3 + 1));
		col = Math.floor(Math.random() * 10);
  }

  var newLocations = [];
	for (var i = 0; i < 3; i++) {
		if (direction === 1) {
      var temp = [row, col+i];
			newLocations.push(temp);
		} else {
      var temp = [row+i, col];
			newLocations.push(temp);
		}
	}
	return newLocations;
};

Board.prototype.updateSunkSquares = function(ship) {
  for (var i = 0; i < ship.coors.length; i++) {
    var coor = ship.coors[i];
    this.grid[coor[0]][coor[1]].className = 'sunk';
  }
};

Board.prototype.anyShipNewlySunk = function() {
  for (var i = 0; i < this.ships.length; i++) {
    var ship = this.ships[i];
    if (this.newlySunk(ship)) {
      ship.sunk = true;
      this.updateSunkSquares(ship);
      console.log(ship.name, 'sunk!');
      return ship;
    }
  }
  return;
};

Board.prototype.newlySunk = function(ship) {
  if (!ship.sunk) {
    var sunk = true;
    for (var i = 0; i < ship.coors.length; i++) {
      var coor = ship.coors[i];
      if (!this.grid[coor[0]][coor[1]].touched) {
        sunk = false;
      }
    }
    return sunk;
  }
  return false;
};

Board.prototype.placeShips = function() {
  for (var i = 0; i < this.ships.length; i++) {
    var ship = this.ships[i];
    for (var j = 0; j < ship.coors.length; j++) {
      var coor = ship.coors[j];
      this.grid[coor[0]][coor[1]].ship = true;
    }
  }
};

module.exports = Board;
