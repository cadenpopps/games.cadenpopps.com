
var player;
var circle;

var playing = false;
var gameover = false;

const RADIUS = 150;
const MOUSE_SIZE = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);

    listen('mousemoved');
    player = new Player();
    circle = new Circle();
    loop();
}

function draw() {

    background(30, 30, 60);

    if (!gameover) {
        circle.display();
    }
    if (playing) {
        player.update();
        circle.update();
        player.display();
        $('#score').html("Score: " + player.getScore());
    }
}

function init() {
    start();
    playing = true;
}

function endgame() {
    console.log("gameover");
    playing = false;
    gameover = true;
    final();
}

function mousePressed() {

    if (startScreen) {
        if (mode == 1) {
            if (dist(mouseX, mouseY, width / 2, height / 2) < 25) {
                startScreen = false;
                initMode1();
            }
        }
    }
    else if (scoreScreen) {
        init();
    }
    else {
        if (mode == 1) {
            scoreScreen = true;
            for (var i = dots.length - 1; i >= 0; i--) {
                if (abs((mouseX - dots[i].x) + (mouseY - dots[i].y)) < dots[i].size / 1.5) {
                    if (dots[i].mouseInside()) {
                        dots[i] = null;
                        dots.splice(i, 1);
                        player.incrementScore();
                        scoreScreen = false;
                    }
                }
            }
        }
    }
}

function keyPressed() {
    if (startScreen) {
        if (keyCode == 32) {
            mode ^= 1;
        }
    }
}

function displayStartScreen() {
    fill(240);
    if (mode == 0) {
        if (mode0Countdown == -1) {
            textSize(width / 15);
            text("Stay inside the circle", width / 2, height / 6);
        }
        else {
            textSize(width / 10);
            text(floor((mode0Countdown) / 30) + 1, width / 2, height / 5);
        }
        fill(150, 20, 50);
        ellipse(width / 2, height / 2, 100, 100);
    }
    else if (mode == 1) {
        textSize(width / 15);
        text("Click the circles", width / 2, height / 6);
        stroke(255);
        strokeWeight(dotSize);
        point(width / 2, height / 2);
        noStroke();
    }

    fill(240);
    textSize(width / 30);
    text("Press space to switch mode", width / 2, height - (height / 15));
}

function displayScoreScreen() {
    fill(240);
    if (mode == 0) {
        textSize(width / 15);
        text("Your score was " + player.getScore(), width / 2, height / 2);
    }
    else if (mode == 1) {
        textSize(width / 15);
        text("You clicked " + player.getScore() + " dots", width / 2, height / 2);
    }

    textSize(width / 30);
    text("Click to try again", width / 2, height - (height / 3));
}

function displayGame() {
    if (mode == 0) {
        boundary.display();
    }
    else if (mode == 1) {
        for (let d of dots) {
            d.display();
        }
    }
    fill(240);
    textSize(width / 30);
    text("Score: " + player.getScore(), width / 2, height - (height / 15));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
