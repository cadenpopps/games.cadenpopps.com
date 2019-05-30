function Board() {

    var board = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = new Array(BOARD_SIZE);
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = new Square(BLANK);
        }
    }


    this.getBoard = function () {
        return board;
    }

    this.newFood = function(){
        board[randomInt(BOARD_SIZE)][randomInt(BOARD_SIZE)].squareType = FOOD;
    }

    this.display = function () {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                board[i][j].getColor();
                rect(xoffset + (i * SQUARE_SIZE), yoffset + (j * SQUARE_SIZE), SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }

    this.newFood();

}