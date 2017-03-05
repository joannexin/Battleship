const Square = function() {
  this.touched = false;
  this.ship = false;
  this.show = " ";
  this.className = "water";
}

Square.prototype.hit = function() {
  if (this.touched) {
    console.log('Already taken!');
    return false;
  } else if (this.ship){
    this.touched = true;
    this.show = "X"
    this.className = "ship";
    console.log('hit!');
    return true;
  } else {
    this.touched = true;
    this.show = "O"
    this.className = "miss";
    console.log('missed!');
    return true;
  }
};

module.exports = Square;
