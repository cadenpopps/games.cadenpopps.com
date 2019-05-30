function Firework() {

    this.isF = true;
    var pos = createVector(0, -100);
    var vel = createVector();
    var acc = createVector();
    var size = 0;
    var particleCounter = 0;
    var timer = 0;
    this.exploded = false;
    this.active = false;
    this.col = new Array(3);

    this.reset = function () {
        timer = random(10, 30);
        var yOff = random(100);
        pos.x = random(mouseX - FIREWORK_SPAWN_DISTANCE, mouseX + FIREWORK_SPAWN_DISTANCE);
        pos.y = height + 50 + yOff;
        vel.set(((mouseX - pos.x) / 500) + random(-.2, .2), (mouseY - pos.y) / 400 + random(-1, 0));
        vel.mult(currentFireworkSpeed);
        size = random(10, 20);
        particleCounter = 0;
        this.exploded = false;
        this.active = true;
        this.col[0] = random(150, 255);
        this.col[1] = osc(score / 10, 100, 100) + random(-25, 25);
        this.col[2] = osc(score / 3, 150, 50) + random(-25, 25);
    };

    this.getX = function () {
        return pos.x;
    }
    this.getY = function () {
        return pos.y;
    }
    this.getSize = function () {
        return size;
    }

    this.requestParticles = function () {
        for (let p of particles) {
            if (particleCounter < MAX_PARTICLES && particleCounter < size / 3) {
                if (!p.active) {
                    particleCounter++;
                    p.reset(size, pos.x, pos.y, this.col);
                }
            }
            else {
                break;
            }
        }
    };

    this.update = function () {
        if (!this.exploded) {
            acc.y += GRAVITY;
            vel.x *= RESISTANCE;
            vel.y *= RESISTANCE;
            applyForces(pos, vel, acc);
            if (vel.y > 1) {
                timer--;
                if (timer <= 0) {
                    this.requestParticles();
                    this.destroy();
                }
            }
        }
    };

    this.destroy = function () {
        pos.x = -100;
        pos.y = -100;
        vel = createVector();
        acc = createVector();
        size = 0;
        particleCounter = 0;
        this.exploded = true;
        this.active = false;
        this.lifetime = 0;
    };

    this.display = function () {
        if (!this.exploded) {
            // strokeWeight(size);
            // stroke(this.col[0], this.col[1], this.col[2]);
            fill(this.col[0], this.col[1], this.col[2]);
            point(pos.x, pos.y, size);
        }
    };
}