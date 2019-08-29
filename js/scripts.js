//////////// Business Logic ////////////////
//////////// Player Object ////////////////
function Player(inputName) {
  this.name = inputName,
  this.score = 0,
  this.isAI = false
}

//////////// Board Object ////////////////
function Board() {
  this.players = [],
  this.turn = 0,
  this.movesLeft = 42,
  this.board = []
}

Board.prototype.initBoard = function() {
  this.board = [];
  for(let i=0; i<=6; i++) {
    this.board.push(new Array(7));
  }
  this.movesLeft = 42;
  this.turn = Math.round(Math.random());
}

Board.prototype.updateBoard = function(col) {
  var endRow = -1;
  for(let row=0;row<=5; row++){
    if(!(this.board[row][col] === 0 || this.board[row][col] === 1)){
      this.board[row][col] = this.turn;
      this.movesLeft--;
      endRow = row;
      break;
    }
  }
  return endRow;
}

// refactor following 2 methods into 1
Board.prototype.checkWinVert = function(col){
  var playerNum = -1;
  var count = 0;
  var win = false;
    for(let row=0; row<=5; row++){
      if(this.board[row][col] === 0 || this.board[row][col] === 1){
        if(this.board[row][col] === playerNum){
          count++;
        }
        else {
          playerNum = this.board[row][col];
          count = 1;
        }
      }
      if(count === 4){
        win = true;
        break;
      }
    }
    return win;
}

Board.prototype.checkWinHorz = function(row){
  var playerNum = -1;
  var count = 0;
  var win = false;
    for(let col=0; col<=6; col++){
      if(this.board[row][col] === 0 || this.board[row][col] === 1){
        if(this.board[row][col] === playerNum){
          count++;
        }
        else {
          playerNum = this.board[row][col];
          count = 1;
        }
      }
      if(count === 4){
        win = true;
        break;
      }
    }
    return win;
}

// Diagonal win condition check
/*
  y1 = x + a
  y2 = -x + b

  row = col + a
  row = -col + b

  a = row - col
  b = row + col

  y1 = [0-5] + a
  y2 = -[0-5] + b

  y1 -> [0-6] keep
  y2 -> [0-6] keep

*/
Board.prototype.checkWinDiag = function(x, y){
  var arrayDiagPos = [];
  var arrayDiagNeg = [];
  var countPos = 0;
  var countNeg = 0;
  var win = false;

  var a = y - x;
  var b = y + x;

  for(var col = 0; col <=6; col++){
    var newRowPos = col + a;
    var newRowNeg = -col + b;
    if(newRowPos <=5 && newRowPos >= 0){
      arrayDiagPos.push([col,newRowPos]);
    }
    if(newRowNeg <=5 && newRowNeg >= 0){
      arrayDiagNeg.push([col,newRowNeg]);
    }
  }
  console.log("Arrays", arrayDiagNeg, arrayDiagPos);
  if(arrayDiagPos.length >= 4 ){
    countPos = checkBoardCoord(this, arrayDiagPos);
  }

  if(arrayDiagNeg.length >= 4 ){
    countNeg = checkBoardCoord(this, arrayDiagNeg);
  }
  if(countNeg >= 4 || countPos >= 4){
    win = true;
  }
  console.log("Returned val: " + win);
  return win;
}

function checkBoardCoord(board, arrayToCheck){
  var count = 0;
  for(var i = 0; i < arrayToCheck.length; i++){
    var checkX = arrayToCheck[i][0];
    var checkY = arrayToCheck[i][1];
    var content = board.board[checkY][checkX];
    if(content === board.turn){
      count++;
      console.log(count, checkX, checkY);
    }
    else {
      count = 0;
    }
    if(count === 4){
      break;
    }
  }
  return count;
}

//////////// Lamens Version
// Board.prototype.checkWinDiag = function(y, x) {
//   var line1 = [];
//   var line2 = [];
//   var count = 0;
//
//   for(let i=-3; i<=3; i++) {
//     if(this.board[x+i]) {
//       if(this.board[x+i][y+i] == 0 || this.board[x+i][y+i] == 1) {
//         line1.push(this.board[x+i][y+i]);
//       }
//     }
//   }
//
//   console.log("line1.length= " + line1.length);
//   if(line1.length >= 4) {
//     for(let i=0; i<line1.length; i++) {
//       console.log("i = " + i, "this.turn = " + this.turn);
//       if(line[i] === this.turn) {
//         count++;
//       } else {
//         count = 0;
//       }
//     }
//   }
//   console.log("pos slope count " + count);
//
//   for(let i=-3; i<=3; i++) {
//     if(this.board[x+i]) {
//       j = -i;
//       if(this.board[x+i][y+j] == 0 || this.board[x+i][y+j] == 1) {
//         line2.push(this.board[x+i][y+j]);
//       }
//     }
//   }
//
//   count = 0;
//   console.log("line2.length= " + line2.length);
//   if(line2.length >= 4) {
//     for(let i=0; i<line2.length; i++) {
//       console.log("i = " + i, "this.turn = " + this.turn);
//       if(line2[i] === this.turn) {
//         count++;
//       } else {
//         count = 0;
//       }
//     }
//   }
//
//   console.log("line1 " + line1);
//   console.log("line2 " + line2);
//   console.log("neg slope count " + count);
// }

Board.prototype.changeTurn = function(){
  if(this.turn === 0){
    this.turn = 1;
  } else {
    this.turn = 0;
  }
}

////////////// UI /////////////////////
$(document).ready(function(){
  var board = new Board();
  $("#playArea").hide();

  $("#p-v-p").click(function() {
    board.players = [];
    makePlayer(board);
    makePlayer(board);
    $("#p1-type").text(board.players[0].name);
    $("#p2-type").text(board.players[1].name);

    resetPlay(board);

    $("#play-mode").fadeOut("slow");
    $("#scores").fadeIn("slow");
    $("#playArea").fadeIn("slow");
  });

  $(".col-choice").click(function(){
    //var locations = ["zero", "one", "two", "three", "four", "five", "six"];
    var colNum = parseInt($(this).parent().attr("class").split(" ")[1]);
    //var colNum = locations.indexOf(colString);
    var rowNum = board.updateBoard(colNum);
    if(rowNum === 5){
      $(this).hide();
    }
  //  colorBoard(board, colNum, rowNum);
    cleanUpFlash(board, colNum);
    colorFlash(board, colNum, rowNum);

    if(!checkForWin(board, colNum, rowNum)){
      board.changeTurn();
      showActivePlayer(board);
    } else {
      $("#p1-score").text(board.players[0].score);
      $("#p2-score").text(board.players[1].score);
      alert("WINNER! " + board.players[board.turn].name);
      $(".col-choice").hide();
      $("#rematch").show();
      $("#rage").hide();
      $("#play-mode").fadeIn("slow");
    }
  });

  $("#rage").click(function(){
    resetPlay(board);
    $("#playArea").hide();
    $("#play-mode").fadeIn("slow");
    board.players = [];
  });

  $("#rematch").click(function(){
    resetPlay(board);
    $("#rematch").hide();
    $("#play-mode").fadeOut("slow");
    $("#rage").show();
  });
});

function resetPlay(board){
  $(".col-choice").show();
  $(".col").removeClass("p1");
  $(".col").removeClass("p2");
  board.initBoard();
  showActivePlayer(board);
  $("#p1-score").text(board.players[0].score);
  $("#p2-score").text(board.players[1].score);
}

function checkForWin(board, col, row){
  var win = false;
  if(board.checkWinHorz(row) || board.checkWinVert(col) || board.checkWinDiag(col, row)){
    board.players[board.turn].score++;
    win = true;
  }
  if(board.movesLeft === 0 && !win){
    // TODO make prettier display
    alert("Stalemate! Game Over.")
  }
  return win;
}

function colorBoard(board, col, row){
  var classToAdd = "p" + (board.turn+1);
  $("#" + row + " ." +col).css("animation-duration", (6-row) + "s");
  $("#"+row+" ." +col).toggleClass(classToAdd);
}

function dropChip(board, col, row) {
  var classToAdd = "f" + (board.turn+1);
  console.log($("#" + row + " ." +col));
  $("#" + row + " ." +col).css("animation-duration", (6-row) + "s");
  $("#" + row + " ." +col).addClass(classToAdd);
}

function colorFlash(board, col, row){
  for(var i = 5; i >= row; i--){
    // var now = new Date().valueOf();
    // colorBoard(board, col, i);

    if(i === row){
      colorBoard(board, col, i);
    } else {
      dropChip(board, col, i);
    }
    // console.log(new Date().valueOf() - now);
    console.log("location: " + col + ", " + row);
  }
}

function cleanUpFlash(board){
  $(".col").removeClass("f1");
  $(".col").removeClass("f2");
}

function makePlayer(board){
  var playerCount = board.players.length + 1;
  var pName = prompt("Enter Player " + playerCount + " Name");
  if(!pName){
    pName = "Player "+ playerCount;
  }
  var player = new Player(pName);
  board.players.push(player);
}

function showActivePlayer(board) {
  if(board.turn === 0) {
    $("#p1").addClass("active");
    $("#p1").addClass("b1");
    $("#p2").removeClass("active");
    $("#p2").removeClass("b2");
  } else {
    $("#p2").addClass("active");
    $("#p2").addClass("b2");
    $("#p1").removeClass("active");
    $("#p1").removeClass("b1");
  }
}
