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

  const initPlayers = (player1Name, player2Name) => {
    player1 = Player(player1Name || player1.name, "X");
    player2 = Player(player2Name || player2.name, "O");
    currentPlayer = player1;
  };

  const startGame = () => {
    gameBoard.resetBoard();
    gameStatus = {
      isOver: false,
      winner: null,
    };
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
    initPlayers,
    player1: () => player1,
    player2: () => player2,
    currentPlayer: () => currentPlayer,
    gameStatus: () => gameStatus,
    startGame,
    playerTurn,
    checkWin,
    checkTie,
  };
})();

// * Display controller module
const displayController = (() => {
  const eventHandlers = new Map();
  const board = gameBoard.getBoard(); // Get the current state of the game board

  const isValidName = (name) => {
    return name.trim().length > 0;
  };

  const displayErrorMessage = (message) => {
    const errorMessageDiv =
      document.getElementById("error-message") || document.createElement("div");
    errorMessageDiv.id = "error-message";
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.color = "red"; // Make the error message stand out
    document.body.insertBefore(errorMessageDiv, document.body.firstChild);
  };

  const createPlayerInputFields = () => {
    const player1Input = document.createElement("input");
    player1Input.id = "player1-name";
    player1Input.placeholder = "Enter Player 1 Name";

    const player2Input = document.createElement("input");
    player2Input.id = "player2-name";
    player2Input.placeholder = "Enter Player 2 Name";

    document.body.appendChild(player1Input);
    document.body.appendChild(player2Input);
  };

  const createStartRestartButton = () => {
    const button = document.createElement("button");
    button.textContent = "Start Game";
    button.addEventListener("click", () => {
      const player1Name = document.getElementById("player1-name").value;
      const player2Name = document.getElementById("player2-name").value;

      if (!isValidName(player1Name) || !isValidName(player2Name)) {
        displayErrorMessage("Please enter valid names for both players");
        return; // Prevent the game from starting
      }

      // Clear any existing error messages if the input is now valid
      const errorMessageDiv = document.getElementById("error-message");
      if (errorMessageDiv) {
        document.body.removeChild(errorMessageDiv);
      }

      game.initPlayers(player1Name, player2Name);
      game.startGame();
      if (button.textContent === "Start Game") {
        displayGame();
        button.textContent = "Restart Game"; // Change button text after game starts
      } else {
        game.player1().name = player1Name;
        game.player2().name = player2Name;
        restartGame();
      }
    });
    document.body.appendChild(button);
  };

  const restartGame = () => {
    game.startGame();
    updateCells();
    //updateDisplayPlayers();
    managePlayerDisplay();
    // updateDisplayCurrentPlayer();
    manageCurrentPlayerDisplay();
    updateDisplayGameStatus();
  };

  const createGame = () => {
    const gameDiv = document.createElement("div");
    gameDiv.id = "game";

    const gameInfoDiv = document.createElement("div");
    gameInfoDiv.id = "game-info";
    gameDiv.appendChild(gameInfoDiv);

    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.id = "game-board";
    gameDiv.appendChild(gameBoardDiv);

    document.body.appendChild(gameDiv);
  };

  const createGameOutcomeDisplay = () => {
    const outcomeDisplay = document.createElement("div");
    outcomeDisplay.id = "game-outcome";

    const gameInfoDiv = document.getElementById("game-info");

    gameInfoDiv.appendChild(outcomeDisplay);
  };

  const updateDisplayGameStatus = () => {
    const gameStatusDiv = document.getElementById("game-status");
    gameStatusDiv.textContent = `Game is Over: ${
      game.gameStatus().isOver ? "Yes" : "No"
    }`;

    const gameOutcomeDiv = document.getElementById("game-outcome");
    if (game.gameStatus().isOver) {
      const message = game.gameStatus().winner
        ? `${game.gameStatus().winner.name} has won!`
        : "It's a tie!";
      gameOutcomeDiv.textContent = message;
    } else {
      gameOutcomeDiv.textContent = ""; // Clear previous outcome
    }
  };

  const cellClickHandler = (i) => {
    return () => {
      game.playerTurn(i);
      updateDisplay();
    };
  };

  // Create cells for the board
  const createCells = () => {
    const gameBoardDiv = document.getElementById("game-board");
    for (let i = 0; i < board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${i}`;
      cell.dataset.index = i;
      cell.textContent = board[i];
      // Create the event handler and store it in the map
      const handler = cellClickHandler(i);
      eventHandlers.set(cell, handler);
      // Add the event handler to the cell
      cell.addEventListener("click", handler);
      gameBoardDiv.appendChild(cell);
    }
  };

  const updateCells = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      const index = cell.dataset.index;
      cell.textContent = board[index];
    });
  };

  const disableBoardClicks = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      // Get the event handler from the map and remove it
      const handler = eventHandlers.get(cell);
      cell.removeEventListener("click", handler);
    });
  };

  // Create the board and append cells
  const createBoard = () => {
    const gameBoardDiv = document.getElementById("game-board");

    createCells();

    const gameDiv = document.getElementById("game");
    gameDiv.appendChild(gameBoardDiv);
  };

  const updateDisplay = () => {
    const board = gameBoard.getBoard(); // Get the current state of the game board
    for (let i = 0; i < board.length; i++) {
      const cell = document.getElementById(`cell-${i}`);
      cell.textContent = board[i];
      //console.log(cell.textContent);
    }
    manageCurrentPlayerDisplay();
    // updateDisplayCurrentPlayer();
    updateDisplayGameStatus();

    if (game.gameStatus().isOver) {
      const gameOverMessage = getGameOverMessage();
      alert(gameOverMessage);
      disableBoardClicks();
    }
  };

  const getGameOverMessage = () => {
    if (game.gameStatus().isOver) {
      if (game.gameStatus().winner === null) {
        return "It's a tie!";
      } else {
        return `${game.gameStatus().winner.name} has won!`;
      }
    }
  };

  const managePlayerDisplay = () => {
    // Player 1 display / update
    let Player1Div = document.getElementById("player1");
    if (!Player1Div) {
      player1Div = document.createElement("div");
      player1Div.id = "player1";
      const gameInfoDiv = document.getElementById("game-info");
      gameInfoDiv.appendChild(player1Div);
    }
    player1Div.textContent = `${game.player1().name} ${game.player1().marker}`;

    // Player 2 display / update
    let Player2Div = document.getElementById("player2");
    if (!Player2Div) {
      player2Div = document.createElement("div");
      player2Div.id = "player2";
      const gameInfoDiv = document.getElementById("game-info");
      gameInfoDiv.appendChild(player2Div);
    }
    player2Div.textContent = `${game.player2().name} ${game.player2().marker}`;
  };

  const manageCurrentPlayerDisplay = () => {
    let currentPlayer = document.getElementById("current-player");
    if (!currentPlayer) {
      currentPlayer = document.createElement("div");
      currentPlayer.id = "current-player";
      const gameInfoDiv = document.getElementById("game-info");
      gameInfoDiv.appendChild(currentPlayer);
    }
    currentPlayer.textContent = `Current player: ${game.currentPlayer().name}`;
  };

  const displayGameStatus = () => {
    const gameInfoDiv = document.getElementById("game-info");

    gameStatusDiv = document.createElement("div");
    gameStatusDiv.id = "game-status";
    gameStatusDiv.textContent = `Game isOver(?): ${game.gameStatus().isOver}`;

    gameInfoDiv.appendChild(gameStatusDiv);
  };

  const initGame = () => {
    createPlayerInputFields();
    createStartRestartButton();
  };

  const displayGame = () => {
    createGame();
    createGameOutcomeDisplay();
    //displayPlayers();
    managePlayerDisplay();
    //displayCurrentPlayer();
    manageCurrentPlayerDisplay();
    displayGameStatus();
    createBoard();
  };

  return { displayGame, initGame };
})();

// * Test
displayController.initGame();
