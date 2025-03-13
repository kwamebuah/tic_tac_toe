function setGameBoard () {
    const gameBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // possible/available cells to choose from
    const possiblePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return [gameBoard, possiblePositions];
}

function displayBoard(gameboard) {
    const numRows = gameboard.length;
    const numCols = gameboard[0].length;
    for (let i = 0; i < numRows; i++) {
        let row = '|';
        for (let j = 0; j < numCols; j++) {
            row += `${gameboard[i][j]}|`;
        }
        console.log(row);
    }
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