const displayControl = (() => {
  const CoverPage = document.querySelector(".cover");
  const AvetarPage = document.querySelector(".chose-avetar");
  const showAvetarPage = document.querySelector(".play");
  showAvetarPage.addEventListener("click", () => {
    CoverPage.classList.remove("active");
    AvetarPage.classList.add("active");
  });
  const dangerBtn = document.querySelector(".danger-btn");
  dangerBtn.addEventListener("click", () => {
    document.body.style.display = "none";
  });

  const boardBackground = document.querySelector(".gameBoard-bg");
  const allMarkPoint = document.querySelectorAll(".mark");

  const xWins = document.querySelector(".player-x p");
  const oWins = document.querySelector(".player-o p");
  const ties = document.querySelector(".ties p");

  const updateStatsUI = () => {
    const { X, O, tie } = gameBoard.getStats();
    xWins.textContent = X;
    oWins.textContent = O;
    ties.textContent = tie;
  };

  boardBackground.addEventListener("click", (e) => {
    if (e.target.matches(".mark")) {
      const clickBox = e.target;
      const UserIndex = parseInt(e.target.dataset.index);
      const currentPlayer = gameControler.getCurrentPlayer();
      const currentPlayerChip = currentPlayer.getChip();

      if (clickBox.classList.contains("has-bg")) {
        return;
      } else {
        clickBox.style.backgroundImage = `url(${avetarControl.getMarkSource(
          currentPlayerChip
        )})`;
        clickBox.classList.add("has-bg");
        gameControler.playMove(UserIndex);
      }

      if (
        gameBoard.getWinner().found ||
        gameBoard.getGameBoard().every((cell) => cell !== null)
      ) {
        gameBoard.reset();
        allMarkPoint.forEach((mark) => {
          mark.style.backgroundImage = `url("")`;
          mark.classList.remove("has-bg");
        });
        gameBoard.getWinner().found = false;
        updateStatsUI();
      }
    }
  });

  const turn = document.querySelector(".whos-turn");
  const whosTurn = (whos) => {
    turn.textContent = `${whos.getMark()} TURN`;
  };

  const newGame = document.querySelector(".newGame");
  const undoBoard = document.querySelector(".reset");

  undoBoard.addEventListener("click", () => {
    gameBoard.reset();
    allMarkPoint.forEach((mark) => {
      mark.style.backgroundImage = `url("")`;
      mark.classList.remove("has-bg");
    });
  });
  newGame.addEventListener("click", () => {
    location.reload();
  });

  return { whosTurn };
})();

const avetarControl = (() => {
  const getMarkSource = (chip) => {
    const chipOne = "assets/Green-Chip1.svg";
    const chipTwo = "assets/Blue-Chip-2.svg";
    const chipThree = "assets/Pink-Chip-3.svg";
    if (chip === "Xchip-1") {
      return chipOne;
    } else if (chip === "Xchip-2") {
      return chipTwo;
    } else if (chip === "Xchip-3") {
      return chipThree;
    } else if (chip === "Ochip-1") {
      return chipOne;
    } else if (chip === "Ochip-2") {
      return chipTwo;
    } else if (chip === "Ochip-3") {
      return chipThree;
    }
  };

  const avetarPage = document.querySelector(".chose-avetar");
  const gameBoardPage = document.querySelector(".main-gameBoard");
  const chipForm = document.querySelector(".chip-container");
  const playerX = document.querySelectorAll('input[name="playerX"]');
  const playerO = document.querySelectorAll('input[name="playerO"]');
  let playerXchip = null;
  let playerOchip = null;
  let playerXchipNumber = null;
  let playerOchipNumber = null;
  chipForm.addEventListener("submit", (e) => {
    e.preventDefault();

    playerX.forEach((radio) => {
      if (radio.checked) {
        playerXchip = radio.dataset.chip;
        isXChecked = true;
        playerXchipNumber = [...radio.classList].find((cls) =>
          cls.startsWith("chip-")
        );
      }
    });
    playerO.forEach((radio) => {
      if (radio.checked) {
        playerOchip = radio.dataset.chip;
        playerOchipNumber = [...radio.classList].find((cls) =>
          cls.startsWith("chip-")
        );

        isOChecked = true;
      }
    });

    if (!playerOchipNumber || !playerXchipNumber) {
      alert("Please select one of the options below.");
      return;
    }
    if (playerOchipNumber === playerXchipNumber) {
      alert("Please select different marks for both X and O.");
      return;
    }
    gameControler.initPlayers();

    avetarPage.classList.remove("active");
    gameBoardPage.classList.add("active");
    isXChecked = false;
    isOChecked = false;
  });

  const getXchip = () => {
    return playerXchip;
  };
  const getOchip = () => {
    return playerOchip;
  };

  return {
    getXchip,
    getOchip,
    getMarkSource,
  };
})();

const gameBoard = (() => {
  const gameboard = Array(9).fill(null);
  const Winner = { found: false, tie: false };
  let howManyTimeXwon = 0;
  let howManyTimeOwon = 0;
  let howManyTimeTie = 0;

  const stats = {
    X: 0,
    O: 0,
    tie: 0,
  };
  const incrementStat = (key) => {
    if (stats[key] !== undefined) {
      stats[key]++;
    }
  };
  const getStats = () => ({ ...stats });
  const getGameBoard = () => {
    return [...gameboard];
  };

  const player = (chip, mark) => {
    let getChip = () => {
      return chip;
    };
    const getMark = () => {
      return mark;
    };

    return { getChip, getMark };
  };

  const setMark = (index, mark) => {
    gameboard[index] = mark;
  };

  const reset = () => {
    howManyTimeOwon = 0;
    howManyTimeTie = 0;
    howManyTimeXwon = 0;
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = null;
    }
  };
  const getWinner = () => {
    return Winner;
  };

  return Object.freeze({
    incrementStat,
    getStats,
    getGameBoard,
    player,
    reset,
    setMark,
    getWinner,
  });
})();

const gameControler = (() => {
  let player1;
  let player2;
  let currentPlayer;

  const initPlayers = () => {
    player1 = gameBoard.player(avetarControl.getXchip(), "X");
    player2 = gameBoard.player(avetarControl.getOchip(), "O");
    currentPlayer = player1;
    displayControl.whosTurn(currentPlayer);
  };

  const switchTrun = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    displayControl.whosTurn(currentPlayer);
  };

  const getCurrentPlayer = () => currentPlayer;
  const winningCombination = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal TL to BR
    [2, 4, 6], // diagonal TR to BL
  ];
  const checkWinOrTie = () => {
    const getCurrentGameBoard = gameBoard.getGameBoard();
    for (const combo of winningCombination) {
      const [a, b, c] = combo;

      if (
        getCurrentGameBoard[a] !== null &&
        getCurrentGameBoard[a] === getCurrentGameBoard[b] &&
        getCurrentGameBoard[b] === getCurrentGameBoard[c]
      ) {
        const playerMark = getCurrentGameBoard[a];

        alert(`The Winner is ${playerMark}`);

        gameBoard.getWinner().found = true;
        if (playerMark === "X") {
          gameBoard.incrementStat("X");
        } else if (playerMark === "O") {
          gameBoard.incrementStat("O");
        }

        return;
      }
    }
    if (getCurrentGameBoard.every((cell) => cell !== null)) {
      alert("Its a tie");
      gameBoard.getWinner().found = false;
      gameBoard.incrementStat("tie");
    }
  };

  const playMove = (index) => {
    const board = gameBoard.getGameBoard();
    if (board[index] === null) {
      gameBoard.setMark(index, currentPlayer.getMark());
      checkWinOrTie();
      switchTrun();
    }
  };

  return { initPlayers, switchTrun, checkWinOrTie, getCurrentPlayer, playMove };
})();
