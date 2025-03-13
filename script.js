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
