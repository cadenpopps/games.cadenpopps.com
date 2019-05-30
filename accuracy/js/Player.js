function Player() {

    var score = 0;
    var x = mouseX;
    var y = mouseY;
    var incCounter = 0;

    this.update = function () {
        if (this.outside(x, y)) {
            endgame();
        }
        else {
            incrementScore();
        }
    }

    this.outside = function () {
        return dist(mouseX, mouseY, circle.getX(), circle.getY()) > (circle.getRadius() + (MOUSE_SIZE / 1.5));
    }

    this.getScore = function () {
        return score;
    };

    this.resetScore = function () {
        score = 0;
    };

    var incrementScore = function () {
        if (incCounter == 10) {
            score++;
            incCounter = 0;
        }
        incCounter++;
    };

    this.display = function () {
        fill(255, 255, 255);
        x = mouseX;
        y = mouseY;
        ellipse(x, y, MOUSE_SIZE);
    }
}