function Snow(x, y) {
    this.pos = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.reset();

}

Snow.prototype.newValues = function () {
    this.dist = random(MIN_DIST, MAX_DIST);
    if (oneIn(2) && this.dist < CLOSE_DISTANCE) {
        this.dist = random(CLOSE_DISTANCE, MAX_DIST);
    }
    this.size = random(MIN_SIZE, MAX_SIZE);
    this.weight = (random(this.size - 1, this.size + 1) / (this.dist / 8)) / 50;
    if (this.dist < CLOSE_DISTANCE) {
        this.blur = ((this.dist - MIN_DIST) / (MAX_DIST + 1));
    }
    else {
        this.displaySize = (this.size / (this.dist / 2)) / 1.5;
    }

    this.vel.mult(0);
    this.acc.mult(0);
};

Snow.prototype.reset = function () {
    if (oneIn(2)) {
        this.pos.set(random(-BOUNDARY_X, width + BOUNDARY_X), random(-MAX_SIZE * 2, -MAX_SIZE));
    }
    else {
        if (oneIn(2)) {
            this.pos.set(random(-MAX_SIZE * 2, -MAX_SIZE), random(-BOUNDRARY_Y, height));
        }
        else {
            this.pos.set(random(width + MAX_SIZE, width + MAX_SIZE * 2), random(-BOUNDRARY_Y, height));

        }
    }
    this.newValues();
};

Snow.prototype.update = function () {
    this.vel.y += GRAVITY * this.weight;
    this.vel.mult(RESISTANCE - (this.dist / (8 * MAX_DIST)));

    this.wind();

    applyForces(this.pos, this.vel, this.acc);

    this.bounds();
};


Snow.prototype.wind = function () {
    this.acc.x = wind.x / this.dist;
    this.acc.y = wind.y / this.dist;
    this.acc.x += farWind.x * (MIN_DIST / this.dist);
    this.acc.y += farWind.y * (MIN_DIST / this.dist);
}

Snow.prototype.bounds = function () {
    if (this.pos.y > height + BOUNDRARY_Y || this.pos.x < -BOUNDARY_X || this.pos.x > width + BOUNDARY_X) {
        this.reset();
    }
}

Snow.prototype.display = function () {
    fill(255);
    if (this.dist < CLOSE_DISTANCE) {
        blurryCircle(this.pos.x, this.pos.y, this.size / (this.dist / 2), this.blur);
    }
    else {
        point(this.pos.x, this.pos.y, this.displaySize);
    }
};

function blurryCircle(x, y, radius, blur) {
    let gradient = canvas.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(blur, 'rgba(255,255,255,.85)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    canvas.fillStyle = gradient;
    canvas.fillRect(x - radius, y - radius, x + radius, y + radius);
    canvas.fillStyle = "#ffffff";
}
