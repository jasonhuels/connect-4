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
  for(let i=0; i<7; i++) {
    this.board.push(new Array(7));
  }
}

Board.prototype.updateBoard = function(playerNum, col) {
  var output = false;
  for(let row=0;row<=6; row++){
    if(!this.board[row][col]){
      this.board[row][col] = playerNum;
      output = true;
      this.movesLeft--;
      break;
    }
  }
  return output;
}

// refactor following 2 methods into 1
Board.prototype.checkWinVert = function(col){
  var playerNum = -1;
  var count = 0;
  var win = false;
    for(let row=0; row<=6; row++){
      if(this.board[row][col]){
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
    for(let col=0; col<=7; col++){
      if(this.board[row][col]){
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
