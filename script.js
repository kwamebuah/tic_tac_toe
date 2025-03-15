function getPlayers(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const playerOne = { name: playerOneName, token: 'X' };
    const playerTwo = { name: playerTwoName, token: 'O' };

    return { playerOne, playerTwo };
}

function setGameBoard() {
    const gameBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // possible/available cells to choose from
    const possiblePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const getGameBoard = () => gameBoard;
    const getPossiblePositions = () => possiblePositions;

    return { getGameBoard, getPossiblePositions };
}

function displayBoard(gameboard) {
    const numRows = gameboard.length;
    const numCols = gameboard[0].length;
    let boardDisplay = '';
    for (let i = 0; i < numRows; i++) {
        boardDisplay += '|';
        for (let j = 0; j < numCols; j++) {
            boardDisplay += `${gameboard[i][j]}|`;
        }
        boardDisplay += '\n';
    }
    return boardDisplay;
}

function colChecker(gameBoard) {
    /* Check if any column has the same tokens in each cell */

    let numCols = gameBoard[0].length;
    for (let col = 0; col < numCols; col++) {
        // value of element in first row of column
        const topColValue = gameBoard[0][col];
        let matchCounter = 0;
        // go through rest of the rows
        for (let row = 1; row < gameBoard.length; row++) {
            if (topColValue !== gameBoard[row][col]) {
                break;
            }
            matchCounter++;
            if (matchCounter === (gameBoard.length - 1)) {
                return topColValue;
            }
        }
    }
    return null;
}

function rowChecker(gameBoard) {
    /* Check if any row has the same tokens in each cell */

    for (let row = 0; row < gameBoard.length; row++) {
        // value of element in first column of row
        const firstRowVal = gameBoard[row][0];
        let matchCounter = 0;
        // go through rest of the columns in the row
        for (let col = 1; col < gameBoard[0].length; col++) {
            if (firstRowVal !== gameBoard[row][col]) {
                break;
            }
            matchCounter++;
            if (matchCounter === (gameBoard[0].length - 1)) {
                return firstRowVal;
            }
        }
    }
    return null;
}

function diagonalChecker(gameBoard) {
    /* Check if any diagonal has the same tokens in each cell */

    const size = gameBoard.length;

    // Main diagonal
    const topLeftCornerVal = gameBoard[0][0];
    let diagMatchCount = 0;
    for (let row = 1; row < size; row++) {
        if (topLeftCornerVal !== gameBoard[row][row]) {
            break;
        }
        diagMatchCount++;
        if (diagMatchCount === (size - 1)) {
            return topLeftCornerVal;
        }
    }

    // Anti-diagonal
    const topRightCornerVal = gameBoard[0][size - 1];
    let antiMatchCount = 0;
    for (let row = 1; row < size; row++) {
        if (topRightCornerVal !== gameBoard[row][size - 1 - row]) {
            break;
        }
        antiMatchCount++;
        if (antiMatchCount === size - 1) {
            return topRightCornerVal;
        }
    }
    return null;
}

while (true) {
    let playGameChoice = prompt('Play tic_tac_toe? (y/n)');

    if (playGameChoice === 'n' || playGameChoice === "") {
        break;
    }

    const { getGameBoard, getPossiblePositions } = setGameBoard();
    const originalPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    console.log(displayBoard(getGameBoard()));

    const { playerOne, playerTwo } = getPlayers('Kofi', 'Mina');
    // const player1Token = 'x';
    // const player2Token = '0';

    let row;
    let col;

    let player1Position;
    let player2Position;

    gameloop: while (true) {
        player1Position = Number(prompt(`${playerOne.name} Choose a position from 1 to 9`));

        // Player can only select available cells
        if (!getPossiblePositions().includes(player1Position)) {
            continue;
        }

        console.clear();

        row = getGameBoard().findIndex(subArray => subArray.includes(player1Position));
        col = getGameBoard()[row].findIndex(val => val === player1Position);
        getGameBoard()[row][col] = playerOne.token;
        getPossiblePositions().splice(getPossiblePositions().findIndex(val => val === player1Position), 1);

        console.log(displayBoard(getGameBoard()));

        // Tie Condition
        if (!getGameBoard().flat().some(val => originalPositions.includes(val))) {
            console.log("It's a tie");
            break gameloop;
        }

        // Win Condition
        let checkWinnerRow = colChecker(getGameBoard());
        let checkWinnerCol = rowChecker(getGameBoard());
        let checkWinnerDiag = diagonalChecker(getGameBoard());
        if (checkWinnerRow !== null || checkWinnerCol !== null || checkWinnerDiag !== null) {
            if (checkWinnerRow === playerOne.token || checkWinnerCol === playerOne.token || checkWinnerDiag === playerOne.token) {
                console.log('Player1 Wins');
                break gameloop;
            }
            else if (checkWinnerRow === playerTwo.token || checkWinnerCol === playerTwo.token || checkWinnerDiag === playerTwo.token) {
                console.log('Player2 Wins');
                break gameloop;
            }
        }

        player2Position = Number(prompt(`${playerOne.name} Choose a position from 1 to 9`));
        if (!getPossiblePositions().includes(player2Position)) {
            continue;
        }

        console.clear();

        row = getGameBoard().findIndex(subArray => subArray.includes(player2Position));
        col = getGameBoard()[row].findIndex(val => val === player2Position);
        getGameBoard()[row][col] = playerTwo.token;
        getPossiblePositions().splice(getPossiblePositions().findIndex(val => val === player2Position), 1);

        console.log(displayBoard(getGameBoard()));

        // Tie Condition
        if (!getGameBoard().flat().some(val => originalPositions.includes(val))) {
            console.log("It's a tie");
            break gameloop;
        }

        // Win Condition
        checkWinnerRow = colChecker(getGameBoard());
        checkWinnerCol = rowChecker(getGameBoard());
        checkWinnerDiag = diagonalChecker(getGameBoard());
        if (checkWinnerRow !== null || checkWinnerCol !== null || checkWinnerDiag !== null) {
            if (checkWinnerRow === playerOne.token || checkWinnerCol === playerOne.token || checkWinnerDiag === playerOne.token) {
                console.log('Player1 Wins');
                break gameloop;
            }
            else if (checkWinnerRow === playerTwo.token || checkWinnerCol === playerTwo.token || checkWinnerDiag === playerTwo.token) {
                console.log('Player2 Wins');
                break gameloop;
            }
        }
    }
}