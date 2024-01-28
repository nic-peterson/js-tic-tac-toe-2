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
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  // * Game logic
  // TODO game start

  const startGame = () => {
    const gameBoard = gameBoard.getBoard();
    // TODO: Continue with the game logic
  };

  const displayGame = () => {
    console.log(gameBoard.getBoard());
    console.log(`player1: ${player1.name} ${player1.marker}`);
    console.log(`player2: ${player2.name} ${player2.marker}`);
    console.log(`current player: ${currentPlayer.name}`);
  };
  // TODO game reset

  // TODO player turn
  // TODO check win
  // TODO check tie
  // * Game flow
  return { startGame, displayGame };
})();

// * Display controller module

// * Test

game.displayGame();
console.log("********");
// const player1 = createPlayer("Player 1", "X");
// const player2 = createPlayer("Player 2", "O");
/*
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
*/
