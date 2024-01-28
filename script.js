// TODO: create gaame, gameboard, and player objects

// * Player factory function
function createPlayer(name, marker) {
  return { name, marker };
}

// * Gameboard module
const gameBoard = (() => {
  let board = Array(9).fill(null); // Represents a 3x3 board

  const getBoard = () => board;

  const updateBoard = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  const isBoardfull = () => {
    return board.every((cell) => cell !== null);
  };

  const isCellEmpty = (index) => {
    return board[index] === null;
  };

  return { getBoard, updateBoard, resetBoard, isBoardfull, isCellEmpty };
})();

// * Game module
const game = (() => {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  let gameStatus = {
    isOver: false,
    winner: null,
  };

  const startGame = () => {
    gameBoard.resetBoard();
    currentPlayer = player1;
    gameStatus = {
      isOver: false,
      winner: null,
    };
    gameController();
  };

  const gameController = () => {
    while (!gameStatus.isOver) {
      playerTurn();
    }
    if (gameStatus.winner === null) {
      console.log("It's a tie!");
    } else {
      console.log(`${gameStatus.winner.name} has won!`);
    }
  };
  const displayGame = () => {
    console.log(`player1: ${player1.name} ${player1.marker}`);
    console.log(`player2: ${player2.name} ${player2.marker}`);
    console.log(`current player: ${currentPlayer.name}`);
    const board = gameBoard.getBoard();
    let j = 1;
    for (let i = 0; i < 9; i += 3) {
      console.log(`row ${j}: ${board[i]} | ${board[i + 1]} | ${board[i + 2]}`);
      j++;
    }
  };

  const playerTurn = (index) => {
    if (gameBoard.isCellEmpty(index)) {
      gameBoard.updateBoard(index, currentPlayer.marker);
      if (checkWin()) {
        gameStatus.winner = currentPlayer;
        gameStatus.isOver = true;
        return;
      }
      if (checkTie()) {
        gameStatus.winner = null;
        gameStatus.isOver = true;
        return;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  const checkWin = () => {
    const board = gameBoard.getBoard();
    // * check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] === board[i + 1] &&
        board[i + 1] === board[i + 2] &&
        board[i] !== null
      ) {
        return true;
      }
    }
    // * check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] === board[i + 3] &&
        board[i + 3] === board[i + 6] &&
        board[i] !== null
      ) {
        return true;
      }
    }
    // * check diagonals
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== null) {
      return true;
    }
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== null) {
      return true;
    }
    return false;
  };

  const checkTie = () => {
    return gameBoard.isBoardfull() && !checkWin();
  };

  return { startGame, displayGame, playerTurn, checkWin, checkTie };
})();

// * Display controller module
const displayController = (() => {
  const htmlBoard = document.createElement("div");
  htmlBoard.id = "game-board";
  const board = gameBoard.getBoard();

  const createCells = () => {
    for (let i = 0; i < board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${i}`;
      cell.dataset.index = i;
      cell.textContent = i;
      cell.addEventListener("click", () => {
        game.playerTurn(i);
      });
      htmlBoard.appendChild(cell);
    }
  };

  const appendBoardToBody = () => {
    document.body.appendChild(htmlBoard);
  };

  const displayBoard = () => {
    createCells();
    appendBoardToBody();
  };

  return { displayBoard };
})();
// * Test
displayController.displayBoard();
// displayController.createCell();
// displayController.appendBoardToBody();

// game.displayGame();
// console.log("********");
// game.playerTurn(0);
// gameBoard.getBoard();
//displayController.displayBoard();
// game.displayGame();
