// TODO: create gaame, gameboard, and player objects

// * Player factory function
const Player = (name, marker) => {
  return { name, marker };
};

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
  let player1, player2;

  let currentPlayer = player1;
  let gameStatus = {
    isOver: false,
    winner: null,
  };

  const initPlayers = () => {
    player1 = Player("Player 1", "X");
    player2 = Player("Player 2", "O");
  };

  const initiGame = () => {
    displayController.displayBoard();
    startGame();
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
    /*
    while (!gameStatus.isOver) {
      playerTurn();
    }
    if (gameStatus.winner === null) {
      console.log("It's a tie!");
    } else {
      console.log(`${gameStatus.winner.name} has won!`);
    }
    */
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

  return {
    initiGame,
    initPlayers,
    player1: () => player1,
    player2: () => player2,
    currentPlayer: () => currentPlayer,
    gameStatus: () => gameStatus,
    startGame,
    displayGame,
    playerTurn,
    checkWin,
    checkTie,
  };
})();

// * Display controller module
const displayController = (() => {
  let htmlBoard;

  // const htmlBoard = createBoard();

  // Create cells for the board
  const createCells = () => {
    const board = gameBoard.getBoard(); // Get the current state of the game board

    for (let i = 0; i < board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${i}`;
      cell.dataset.index = i;
      cell.textContent = board[i];
      cell.addEventListener("click", () => {
        game.playerTurn(i);
        updateDisplay();
      });
      htmlBoard.appendChild(cell);
    }
  };

  // Create the board and append cells
  const createBoard = () => {
    htmlBoard = document.createElement("div");
    htmlBoard.id = "game-board";
    createCells();
    document.body.appendChild(htmlBoard);
  };

  const updateDisplay = () => {
    return;
  };

  const displayBoard = () => {
    createBoard();
  };

  const displayPlayers = () => {
    player1Div = document.createElement("div");
    player1Div.id = "player1";
    player1Div.textContent = `${game.player1().name} ${game.player1().marker}`;
    document.body.appendChild(player1Div);
    player2Div = document.createElement("div");
    player2Div.id = "player2";
    player2Div.textContent = `${game.player2().name} ${game.player2().marker}`;
    document.body.appendChild(player2Div);
  };

  const displayCurrentPlayer = () => {
    currentPlayer = document.createElement("div");
    currentPlayer.id = "current-player";
    currentPlayer.textContent = `Current player: ${game.currentPlayer().name}`;
    document.body.appendChild(currentPlayer);
  };

  const displayGameStatus = () => {
    gameStatusDiv = document.createElement("div");
    gameStatusDiv.id = "game-status";
    gameStatusDiv.textContent = `Game isOver(?): ${game.gameStatus().isOver}`;
    document.body.appendChild(gameStatusDiv);
  };

  const displayGame = () => {
    displayPlayers();
    displayCurrentPlayer();
    displayGameStatus();
    displayBoard();
  };
  return { displayGame };
})();

// * Test
// document.addEventListener("DOMContentLoaded", () => game.initGame());
game.initPlayers();
game.startGame();
displayController.displayGame();
// displayController.createCell();
// displayController.appendBoardToBody();

// game.displayGame();
// console.log("********");
// game.playerTurn(0);
// gameBoard.getBoard();
//displayController.displayBoard();
// game.displayGame();
