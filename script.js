// TODO: create gaame, gameboard, and player objects

// * Player factory function
function createPlayer(name, marker) {
  return { name, marker };
}

// * Gameboard module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const updateBoard = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const isBoardfull = () => {
    return board.every((cell) => cell !== "");
  };

  const isCellEmpty = (index) => {
    return board[index] === "";
  };

  return { getBoard, updateBoard, resetBoard, isBoardfull, isCellEmpty };
})();

// * Game module
const game = (() => {
  // * Game logic
  // TODO player turn
  // TODO check win
  // TODO check tie
  // * Game flow
})();

// * Display controller module

// * Test
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

console.log(player1);
console.log(player2);

console.log(gameBoard.getBoard());
gameBoard.updateBoard(0, player1.marker);
console.log(gameBoard.getBoard());
gameBoard.resetBoard();
console.log(gameBoard.getBoard());

for (let i = 0; i < 9; i++) {
  gameBoard.updateBoard(i, player1.marker);
}
console.log(gameBoard.getBoard());
console.log(gameBoard.isBoardfull());
console.log(gameBoard.isCellEmpty(0));
gameBoard.resetBoard();
console.log(gameBoard.getBoard());
console.log(gameBoard.isCellEmpty(0));
