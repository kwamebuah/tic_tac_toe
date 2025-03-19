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

    let cellPos = 4
    playRound(cellPos);
}

gameController();