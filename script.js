function GameBoard() {
    const arrayLength = 9;
    const board = [];

    for (let i = 0; i < arrayLength; i++) {
        board.push("");
    }
    const getBoard = () => board;

    const placeToken = (selectedCell, playerToken) => {
        const index = (board.length - (board.length - selectedCell)) - 1;
        board[index] = playerToken;
    }

    return { getBoard, placeToken };
}

function gameController() {
    const board = GameBoard();

    let playerOneName = "Player One";
    let playerTwoName = "Player Two";
    const players = [
        {
            name: playerOneName,
            token: "X",
        },
        {
            name: playerTwoName,
            token: "O",
        }
    ];

    let activePlayer = players[0];
    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const playRound = (cell) => {
        board.placeToken(cell, getActivePlayer().token);

        console.log(board.getBoard());

        switchTurn();

    };

    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

function displayController() {
    const game = gameController();
    const gameStateDisplay = document.querySelector('.gamestate');
    const boardDiv = document.querySelector('.gameboard');

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        gameStateDisplay.textContent = `${activePlayer.name}'s turn.`;
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.idx = i + 1;
            cell.textContent = board[i];
            boardDiv.appendChild(cell);
        }
    };

    updateScreen();
}

displayController();