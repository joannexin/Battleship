$(document).ready(function() {

  for (var i = 0; i < 10; i++) {
    var row1 = $(`<div class="row"><div>`);
    var row2 = $(`<div class="row"><div>`);
    for (var j = 0; j < 10; j++) {
      var square1 = $(`<span class="square water" data-player="1" data-coor="${[i,j]}"></span>`);
      var square2 = $(`<span class="square water" data-player="2" data-coor="${[i,j]}"></span>`);
      square1.appendTo(row1);
      square2.appendTo(row2);
      row1.appendTo("#board1");
      row2.appendTo("#board2");
    }
  }
  $('#board2').hide();
  $(".square").on("click", function() {
    var coor = $(this).attr("data-coor").split(",");
    var player = $(this).attr("data-player");
    console.log("player" + player, coor);

    $.post( "/click", { coor: coor, player: player }).done(function( data ) {

      var players = data.boards[0].ships;
      var squareActivity = data.boards[0].grid[coor[0]][coor[1]];

      if (data.boards[0].player === 1) {
        setTimeout(function(){
          $('#board2').show();
          $('#board1').hide();
        }, 1000);
      } else {
        setTimeout(function(){
          $('#board1').show();
          $('#board2').hide();
        }, 1000);
      }

      $('.turn').html(`player ${player === "1" ? "2" : "1"}'s turn...`)
      if (data.boards[0].newlySunkedShip) {
        var sunkShip = data.boards[0].newlySunkedShip.name;
        $('.turn').html(`${sunkShip} sunk!!!!! player ${player === "1" ? "2" : "1"}'s turn...`);
      } else if (squareActivity.show === "X") {
        $('.turn').html(`Hit! Nice job! player ${player === "1" ? "2" : "1"}'s turn...`);
      } else if (squareActivity.show === "O") {
        $('.turn').html(`Miss... player ${player === "1" ? "2" : "1"}'s turn...`);
      }
      if (winnerChecker(players)) {
        alert(`player ${player} won!!!!!`);
        $('.turn').html(`player ${player} won!!!!!`);
      }
      updateGrid(data.boards[0]);

    }).error(function (err) {
      alert('Invalid Move!');
    })
  })

  function winnerChecker(players) {
    var win = true;
    for (var i = 0; i < players.length; i++) {
      if (!players[i].sunk) {
        return false;
      }
    }
    return win;
  }

  function updateGrid(board) {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var $sq = $(`[data-coor='${[i,j]}'][data-player='${board.player}']`);
        $sq.removeClass('water');
        $sq.removeClass('ship');
        $sq.removeClass('miss');
        $sq.addClass(board.grid[i][j].className);
      }
    }
  }

})
