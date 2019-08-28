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

// TODO: Add diagonal win condition check

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
    colorBoard(board, colNum, rowNum);
    if(!checkForWin(board, colNum, rowNum)){
      board.changeTurn();
      showActivePlayer(board);
    } else {
      $("#p1-score").text(board.players[0].score);
      $("#p2-score").text(board.players[1].score);
      alert("WINNER! " + board.players[board.turn].name);
      $(".col-choice").hide();
      $("#rematch").show();
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
  if(board.checkWinHorz(row) || board.checkWinVert(col)){
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
  $("#"+row+" ." +col).addClass(classToAdd);
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
    $("#p1").addClass("p1");
    $("#p2").removeClass("active");
    $("#p2").removeClass("p2");
  } else {
    $("#p2").addClass("active");
    $("#p2").addClass("p2");
    $("#p1").removeClass("active");
    $("#p1").removeClass("p1");
  }
}
