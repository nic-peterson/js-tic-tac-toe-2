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

  return { getBoard, updateBoard, resetBoard };
})();

// * Game module

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

console.log(player1);
console.log(player2);

console.log(gameBoard.getBoard());
gameBoard.updateBoard(0, player1.marker);
console.log(gameBoard.getBoard());
gameBoard.resetBoard();
console.log(gameBoard.getBoard());
