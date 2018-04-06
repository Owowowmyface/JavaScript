export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    //if the space isn't blank, let the user know it's already been flipped
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
    }
    //if there's an existing value in the bombBoard, set the user selection to B
    else if (this._bombBoard[rowIndex][columnIndex]){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    //if there's a blank value and a bomb isn't there, change the tile to reflect the number of adjacent bombs
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex)
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    //set up the possible offsets of the user's selection.
    //user's selection is rowIndex, columnIndex
    let neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    //set the number of rows and columns relative to the bombBoard input:
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    //set the number of adjacent bombs to the user's selection to 0
    let numberOfBombs = 0;
    //for each element in the neighborOffsets array
    neighborOffsets.forEach(offset => {
      //set the position to the user's selection plus the offset
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      //check to make sure that the offset is within the range of possible selections. This will prevent the program from checking non-existing array values.
      if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
        //check if there's an existing value (bombBoard only has null and 'B' values)
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex]) {
          //if there is a value present, increment number of numberOfBombs
           numberOfBombs++;
        }
      }
    });
    //return the number of bombs that are adjacent to the user's selection
    return numberOfBombs;
  };

  winCondition() {
    //if the number of tiles is equal to the number of bombs, the game is won.
    //returns true if the user is victorious
    return this._numberOfTiles === this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    //declare a board array
    let board = [];
    //for loop to generate rows as blank arrays
    for (let boardRows = 0; boardRows < numberOfRows; boardRows++){
      let row = [];
      //for loop to push blank values for each desired "column"
      for (let boardColumns = 0; boardColumns < numberOfColumns; boardColumns++){
        row.push(' ');
      }
      //once the "row" has the appropriate amount of columns added, push it to the board array
      board.push(row);
    }
    //return the board array
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let boardRows = 0; boardRows < numberOfRows; boardRows++){
      let row = [];
      for (let boardColumns = 0; boardColumns < numberOfColumns; boardColumns++){
        row.push(null);
      }
      board.push(row);
    }
  //set a 0 value for number of bombs placed
  let numberOfBombsPlaced = 0
  //while the number of bombs placed is less than the number of bombs we want
  while (numberOfBombsPlaced < numberOfBombs) {
    //find a random number for a row index
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    //find a random number for a column index
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //check to make sure that board[row][column] isn't already a bomb
    if (board[randomRowIndex][randomColumnIndex] !== 'B'){
      //if it's not a bomb, place a bomb and increment the bombs placed
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
      }
    }
    //return the completed bomb board with no repeat bombs
    return board;
  }
}
