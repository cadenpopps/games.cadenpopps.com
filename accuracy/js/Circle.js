function Circle() {
    var pos = createVector(width / 2, height / 2);
    var vel = createVector(0, 0);
    var acc = createVector(0, 0);
    var target = createVector(width / 2, height / 2);
    var radius = RADIUS;
    var radCounter = 0;

    this.getX = function () {
        return pos.x;
    }

    this.getY = function () {
        return pos.y;
    }

    this.getRadius = function () {
        return radius;
    }

    this.update = function () {
        vel.mult(.95);

        var attract = createVector(target.x, target.y);

        attract.x -= pos.x;
        attract.y -= pos.y;
        pos.x += vel.x;
        pos.y += vel.y;
        vel.add(acc);
        acc = attract.mult(.001);

        target.x += random(-30, 30);
        target.y += random(-30, 30);

        target.x = constrain(target.x, 0, width);
        target.y = constrain(target.y, 0, height);

        if (radCounter == 20 && radius > 50) {
            radius--;
            radCounter = 0;
        }
        radCounter++;
    };

    this.display = function () {
        fill(30, 200, 60);
        ellipse(pos.x, pos.y, radius);
    }
}