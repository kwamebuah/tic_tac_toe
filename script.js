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

    const checkWin = board => {
        let hasWin = false;
        let winToken = "";
        let tie = false;
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winPatterns.forEach(pattern => {
            let pos1Val = board[pattern[0]];
            let pos2Val = board[pattern[1]];
            let pos3Val = board[pattern[2]];

            if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
                winToken = pos1Val;
                hasWin = true;
            }
        });

        if (!hasWin) {
            const tieCond = board.every(cell => cell !== "");
            if (tieCond) {
                tie = true;
            }
        }
        return { hasWin, winToken, tie };
    };

    return { getBoard, placeToken, checkWin };
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

    let roundEnd = false;
    const endRound = () => {
        roundEnd = true;
    };
    const getRoundState = () => roundEnd;

    const playRound = (cell) => {
        board.placeToken(cell, getActivePlayer().token);

        console.log(board.getBoard());
        const { hasWin, winToken, tie } = board.checkWin(board.getBoard());
        if (hasWin && winToken === activePlayer.token) {
            console.log(`${activePlayer.name} wins`);
            endRound();
        }
        else if (tie) {
            console.log("It's a tie");
            endRound();
        }

        switchTurn();

    };



    return { playRound, getActivePlayer, getBoard: board.getBoard, getRoundState };
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

    const endRound = () => {
        const cells = document.querySelectorAll('.cell');
        for (let cell of cells) {
            cell.disabled = true;
        }
    };

    boardDiv.addEventListener('click', (event) => {
        const selectedCell = event.target.dataset.idx;
        // make sure we actually select a cell and not an empty gap
        if (!selectedCell) return;
        // check for already clicked cell
        if (event.target.textContent !== "") return;
        game.playRound(selectedCell);
        updateScreen();
        if (game.getRoundState()) {
            endRound();
        }
    });

    // Initial screen update
    updateScreen();
}

displayController();