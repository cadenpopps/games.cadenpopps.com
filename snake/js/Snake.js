
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

function Snake(board) {

    var alive = true;
    var x = 5;
    var y = 5;
    var tail = [[5, 5], [4, 5]];

    var dir = EAST;

    for (let s of tail) {
        board[s[0]][s[1]].squareType = SNAKE;
    }

    this.update = function (board) {

        //update snake head position
        updatePosition();
        if(checkBoundaries()) return false;
        checkCollision(board);

        if (alive) {

            let foodEaten = true;

            if (!checkFood(board)) {
                //remove last tail spot things
                board[tail[tail.length - 1][0]][tail[tail.length - 1][1]].squareType = BLANK;
                tail.splice(tail.length - 1, 1);
                foodEaten = false;
            }

            //update tail
            tail.unshift([x, y]);

            board[x][y].squareType = SNAKE;

            return foodEaten;
        }

        return false;

    }

    var updatePosition = function () {
        handleInputs();
        switch (dir) {
            case EAST:
                x++;
                break;
            case WEST:
                x--;
                break;
            case NORTH:
                y--;
                break;
            case SOUTH:
                y++;
                break;
            default:
                alive = false;
                break;
        }
    }

    var handleInputs = function () {
        // let i = inputs[inputs.length - 1];
        // inputs.splice(inputs.length - 1, 1);
        // if (i == 'd') {
        //     dir = (dir + 1) % 4;
        // }
        // else if (i == 'a') {
        //     dir--;
        //     if (dir < NORTH) dir = WEST;
        // }

        switch (input) {
            case 'w':
                if (dir != SOUTH) {
                    dir = NORTH;
                }
                break;
            case 'd':
                if (dir != WEST) {
                    dir = EAST;
                }
                break;
            case 's':
                if (dir != NORTH) {
                    dir = SOUTH;
                }
                break;
            case 'a':
                if (dir != EAST) {
                    dir = WEST;
                }
                break;
            default:
                break;
        }
    }

    var checkBoundaries = function () {
        if (x < 0 || x > BOARD_SIZE - 1 || y < 0 || y > BOARD_SIZE - 1) {
            alive = false;
        }
        return !alive;
    }

    var checkCollision = function (board) {
        if (board[x][y].squareType == SNAKE) {
            alive = false;
        }
    }

    var checkFood = function (board) {
        return board[x][y].squareType == FOOD;
    }

    this.isAlive = function () {
        return alive;
    }
}