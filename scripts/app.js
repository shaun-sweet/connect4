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
  
  constructor(){
    this.player1;
    this.player2;
    this.board = [];
    this._populateBoard();
  }


  log() {
    return this.board;
  }

  playTurn(column, player) {
    if (this._ifColumnFull(column)) {
      return "This isn't a valid move";
    }
    for (var row = 0; row < 6; row ++) {
      // if column hasn't been played, place piece on the bottom
      if (this.board[row][column] == null && row == 5) {
        this.board[row][column] = player;
        // console.log(this._checkForWin(row, column));
        break;
      }
      // Finds the first "placed piece" and places one, one row above it
      if (this.board[row][column] != null && row != 0) {
         this.board[row - 1][column] = player;
         // console.log(this._checkForWin(row, column));
         break;
      }
    }
  }

  _checkForWin(row, column) {
    var color = this.board[row][column];
    for (var winCondition in winConditions) {
      var successiveColors = 1;
      for (var directions in winConditions[winCondition]) {
        this._checkAdjacentSpaces();
        // var nextCell = {
        //   row: row + winConditions[winCondition][directions].row,
        //   column: column + winConditions[winCondition][directions].column
        // };
        // // Make sure the check is within bounds of the board
        // if (this._cellOutOfBounds(nextCell)) {
        //   continue;
        // }else{
        //   if (this.board[nextCell.row][nextCell.column] === color) {
        //     successiveColors ++;
        //   }else{
        //     continue;
        //   }
        // }
      }
      if (successiveColors > 3) {
        return true;
      }
    }
    return false;
  }

  _checkAdjacentSpaces() {
    var nextCell = {
      row: row + winConditions[winCondition][directions].row,
      column: column + winConditions[winCondition][directions].column
    };
    // Make sure the check is within bounds of the board
    if (this._cellOutOfBounds(nextCell)) {
      return;
    }else{
      if (this.board[nextCell.row][nextCell.column] === color) {
        successiveColors ++;
        
      }else{
        continue;
      }
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

var a = new ConnectFour();
a.playTurn(0, 'black');
a.playTurn(0, 'black');
a.playTurn(0, 'black');
a.playTurn(0, 'black');

// a.playTurn(0, 'red');
// a.playTurn(0, 'red');
// a.playTurn(0, 'red');
// a.playTurn(0, 'red');
// a.playTurn(0, 'black');
console.log(a.log());
// console.log(a.test());
