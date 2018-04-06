'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      //if the space isn't blank, let the user know it's already been flipped
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
      }
      //if there's an existing value in the bombBoard, set the user selection to B
      else if (this._bombBoard[rowIndex][columnIndex]) {
          this._playerBoard[rowIndex][columnIndex] = 'B';
        }
        //if there's a blank value and a bomb isn't there, change the tile to reflect the number of adjacent bombs
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
          }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      //set up the possible offsets of the user's selection.
      //user's selection is rowIndex, columnIndex
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      //set the number of rows and columns relative to the bombBoard input:
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      //set the number of adjacent bombs to the user's selection to 0
      var numberOfBombs = 0;
      //for each element in the neighborOffsets array
      neighborOffsets.forEach(function (offset) {
        //set the position to the user's selection plus the offset
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        //check to make sure that the offset is within the range of possible selections. This will prevent the program from checking non-existing array values.
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          //check if there's an existing value (bombBoard only has null and 'B' values)
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex]) {
            //if there is a value present, increment number of numberOfBombs
            numberOfBombs++;
          }
        }
      });
      //return the number of bombs that are adjacent to the user's selection
      return numberOfBombs;
    }
  }, {
    key: 'winCondition',
    value: function winCondition() {
      //if the number of tiles is equal to the number of bombs, the game is won.
      //returns true if the user is victorious
      return this._numberOfTiles === this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      //declare a board array
      var board = [];
      //for loop to generate rows as blank arrays
      for (var boardRows = 0; boardRows < numberOfRows; boardRows++) {
        var row = [];
        //for loop to push blank values for each desired "column"
        for (var boardColumns = 0; boardColumns < numberOfColumns; boardColumns++) {
          row.push(' ');
        }
        //once the "row" has the appropriate amount of columns added, push it to the board array
        board.push(row);
      }
      //return the board array
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var boardRows = 0; boardRows < numberOfRows; boardRows++) {
        var row = [];
        for (var boardColumns = 0; boardColumns < numberOfColumns; boardColumns++) {
          row.push(null);
        }
        board.push(row);
      }
      //set a 0 value for number of bombs placed
      var numberOfBombsPlaced = 0;
      //while the number of bombs placed is less than the number of bombs we want
      while (numberOfBombsPlaced < numberOfBombs) {
        //find a random number for a row index
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        //find a random number for a column index
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        //check to make sure that board[row][column] isn't already a bomb
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          //if it's not a bomb, place a bomb and increment the bombs placed
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      //return the completed bomb board with no repeat bombs
      return board;
    }
  }]);

  return Board;
}();
