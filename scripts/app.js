// Possible directions:  Horizontal, vertical, left diagnal \ and right diagnal /
const winConditions = {

  horizontal: {
    rightHorizontal: {row: 0, column: 1},
    leftHorizontal: {row: 0, column: -1}
  },

  vertical: {
    downVertical: {row: 1, column: 0},
    upVertical: {row: -1, column: 0}
  },

  leftDiagonal: {
    downLeftDiagonal: {row: 1, column: 1},
    upLeftDiagonal: {row: -1, column: -1}
  },

  rightDiagonal: {
    upRightDiagonal: {row: -1, column: 1},
    downRightDiagonal: {row: 1, column: -1}
  }
}

class ConnectFour {
  
  constructor(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.board = [];
    this.currentTurn = player1;
    this._populateBoard();
    this.gameWon = false;
  }


  log() {
    return this.board;
  }

  playTurn(column) {
    if (this._ifColumnFull(column)) {
      return "This isn't a valid move";
    } else if (this.gameWon){
      console.log("Game is won!");
      return "Game has been won";
    }
    for (var row = 0; row < 6; row ++) {
      // if column hasn't been played, place piece on the bottom
      if (this.board[row][column] == null && row == 5) {
        this.board[row][column] = this.currentTurn;
        this.gameWon = this._checkForWin(row, column);
        break;
      }
      // Finds the first "placed piece" and places one, one row above it
      if (this.board[row][column] != null && row != 0) {
        this.board[row - 1][column] = this.currentTurn;
        this.gameWon = this._checkForWin(row - 1, column);
        break;
      }
    }
    this._switchPlayerTurn();
  }

  _checkForWin(row, column) {
    var currentCell = {
      row: row,
      column: column
    };
    console.log(currentCell);
    var color = this.board[row][column];
    for (var winCondition in winConditions) {
      var successiveColors = 1;
      for (var directions in winConditions[winCondition]) {
        successiveColors += this._checkAdjacentSpaces(currentCell, color, winConditions[winCondition][directions], 0);
      }
      if (successiveColors > 3) {
        return true;
      }
    }
    return false;
  }

  _checkAdjacentSpaces(currentCell, color, direction, iterationNum) {
    var nextCell = {
      row: currentCell.row + direction.row,
      column: currentCell.column + direction.column
    };
    // Base cases for function.  If the direction takes the next cell out of bounds or the cell isn't the same as the previous one or it has done its 3 passes
    if (this._cellOutOfBounds(nextCell) || this.board[nextCell.row][nextCell.column] != color || iterationNum > 2) {
      return 0;
    }else{
      return 1 + this._checkAdjacentSpaces(nextCell, color, direction, iterationNum + 1);
    }
  }

  _switchPlayerTurn() {
    if (this.currentTurn == this.player1) {
      this.currentTurn = this.player2
    } else {
      this.currentTurn = this.player1
    }
  }

  _cellOutOfBounds(nextCell) {
    if (nextCell.row < 0 || nextCell.row > 5 || nextCell.column < 0 || nextCell.column > 6) {
      return true;
    } else {
      return false;
    }
  }

  _populateBoard() {
    for(var row = 0; row < 6; row ++ ){
      var currentRow = [];
      for(var column = 0; column < 7; column ++){
        currentRow.push(null);
      }
      this.board.push(currentRow);
    }
  }

  _ifColumnFull(column) {
    if (this.board[0][column] != null) {      
      return true;
    }
    return false;
  }

}

var a = new ConnectFour("black", "blue");
a.playTurn(0);
a.playTurn(1);
a.playTurn(2);
a.playTurn(3);

a.playTurn(0);
// a.playTurn(0, 'red');
// a.playTurn(0, 'red');
// a.playTurn(0, 'red');
// a.playTurn(0, 'black');
console.log(a.log());
// console.log(a.test());
