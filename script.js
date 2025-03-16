function createPlayer(playerName, playerNumber) {
    let name = playerName;
    const token = playerNumber === 1 ? 'X' : 'O';
    let score = 0;

    if (playerName === "" && playerNumber === 1) {
        name = 'Player One';
    }
    if (playerName === "" && playerNumber === 2) {
        name = 'Player Two';
    }
    
    const giveScore = () => score++;
    const getScore = () => score;

    return { name, token, getScore, giveScore };
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

function checkforWin(gameBoard, playerOne, playerTwo) {
    const players = [playerOne, playerTwo];
    const checkResults = [colChecker(gameBoard), rowChecker(gameBoard), diagonalChecker(gameBoard)];
    let hasWinner = false;
    let winner = null;

    for (const result of checkResults) {
        if (result !== null) {
            for (const player of players) {
                if (player.token === result) {
                    hasWinner = true;
                    winner = player;
                    return { hasWinner, winner };
                }
            }
        }
    }
    return { hasWinner, winner };
}

(function playGame() {
    let playGameChoice = prompt('Play tic_tac_toe? (y/n)');
    if (playGameChoice === 'n' || playGameChoice === "") {
        return;
    }

    // Create players
    const player1Number = 1;
    const player2Number = 2;
    let player1Name = prompt('Player 1 Please enter your name');
    let player2Name = prompt('Player 2 Please enter your name');
    const playerOne = createPlayer(player1Name, player1Number);
    const playerTwo = createPlayer(player2Name, player2Number);

    const { getGameBoard, getPossiblePositions } = setGameBoard();

    console.log(displayBoard(getGameBoard()));

    playRound(getGameBoard(), getPossiblePositions(), playerOne, playerTwo);
    playGame();
})();

function playRound(gameBoard, possiblePositions, playerOne, playerTwo) {
    const originalPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    gameloop: while (true) {
        let player1Position = Number(prompt(`${playerOne.name} Choose a position from 1 to 9`));

        // Player can only select available cells
        if (!possiblePositions.includes(player1Position)) {
            continue;
        }

        console.clear();

        let row = gameBoard.findIndex(subArray => subArray.includes(player1Position));
        let col = gameBoard[row].findIndex(val => val === player1Position);
        gameBoard[row][col] = playerOne.token;
        possiblePositions.splice(possiblePositions.findIndex(val => val === player1Position), 1);

        console.log(displayBoard(gameBoard));

        // Tie Condition
        if (!gameBoard.flat().some(val => originalPositions.includes(val))) {
            console.log("It's a tie");
            break gameloop;
        }

        // Win Condition
        let { hasWinner, winner } = checkforWin(gameBoard, playerOne, playerTwo);
        if (hasWinner) {
            console.log(`${winner.name} wins`);
            break gameloop;
        }

        let player2Position = Number(prompt(`${playerTwo.name} Choose a position from 1 to 9`));
        if (!possiblePositions.includes(player2Position)) {
            continue;
        }

        console.clear();

        row = gameBoard.findIndex(subArray => subArray.includes(player2Position));
        col = gameBoard[row].findIndex(val => val === player2Position);
        gameBoard[row][col] = playerTwo.token;
        possiblePositions.splice(possiblePositions.findIndex(val => val === player2Position), 1);

        console.log(displayBoard(gameBoard));

        // Tie Condition
        if (!gameBoard.flat().some(val => originalPositions.includes(val))) {
            console.log("It's a tie");
            break gameloop;
        }

        // Win Condition
        ({ hasWinner, winner } = checkforWin(gameBoard, playerOne, playerTwo));
        if (hasWinner) {
            console.log(`${winner.name} wins`);
            break gameloop;
        }
    }
}