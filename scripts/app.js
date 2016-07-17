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

  test() {
    return this.board[6];
  }

  playTurn(column, player) {
    this._checkIfColumnFull(column);
    for (var row = 0; row < 6; row ++) {
      // Finds the first "placed piece" and places one, one row above it
      if (this.board[row][column] == null && row == 5) {
        return this.board[row][column] = player;
      }
      // if column hasn't been played, place piece on the bottom
      if (this.board[row][column] != null && row != 0) {
        return this.board[row - 1][column] = player;
      }
    }
  }


  checkForWin() {
    // diagnals are only possible on column 3 (0 indexed)
    // column 3 is the only column that needs both right horizontal and left checked
    // column 4-6 only need horizontal checked to the left of the piece
    // column 0-2 only need horizontal checked to the right of the piece
    // row 0-2 only need vertical checked downwards
    // row 3-5 only need vertical checked upwards
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

  _checkIfColumnFull(column) {
    if (this.board[0][column] != null) {      
      return "Invalid Move";
    }
  }

}

var a = new ConnectFour();
a.playTurn(0, 'black');
a.playTurn(0, 'red');
a.playTurn(1, 'red');
a.playTurn(2, 'black');
a.playTurn(0, 'red');
a.playTurn(0, 'red');
a.playTurn(0, 'red');
console.log(a.log());
console.log(a.test());
