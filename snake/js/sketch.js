
const BLANK = 0;
const FOOD = 1;
const SNAKE = 2;

const BOARD_SIZE = 30;
var SQUARE_SIZE = 0;
var xoffset = 50, yoffset = 50;

var board, snake;

var gameTimer = null;

var input = '';

function setup() {

    createCanvas(windowWidth, windowHeight);

    listen('keydown');

    resize();
    init();

}

function init() {
    board = new Board();
    snake = new Snake(board.getBoard());

    loop();

    gameTimer = setInterval(() => {
        update();
    }, 100);
}

function draw() {

    background(15, 10, 30);
    fill(255, 255, 255);
    rect(xoffset - 3, yoffset - 3, 6 + (SQUARE_SIZE * BOARD_SIZE), 6 + (SQUARE_SIZE * BOARD_SIZE))

    board.display();

}

function update() {
    if (snake.isAlive()) {
        if (snake.update(board.getBoard())) {
            board.newFood();
        }
    }
    else {
        alert('SNAKE DIED!!! GET GOOD');
        noLoop();
        clearInterval(gameTimer);
    }
}

function resize() {
    if (width > height) {
        SQUARE_SIZE = floor((height - 100) / BOARD_SIZE);
        xoffset = (width / 2) - ((SQUARE_SIZE * BOARD_SIZE / 2));
    }
    else {
        SQUARE_SIZE = floor((width - 100) / BOARD_SIZE);
        yoffset = (height / 2) - ((SQUARE_SIZE * BOARD_SIZE / 2));
    }
}

function keyDown(e) {
    let k = key.toLowerCase();
    if (k == 'a' || k == 'd' || k == 'w' || k == 's') {
        // if (inputs.indexOf(k) == -1) {
        //     inputs.push(k);
        // }
        input = k;
    }
}