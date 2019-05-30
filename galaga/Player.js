function Player() {

	const MOVESPEED = 1.4;
	const size = 150;
	const DIAGMOVESPEED = MOVESPEED / 2 * 1.4142135623746;
	const MAXSPEED = 30;
	const ROTATESPEED = .08;
	var pos = createVector(width / 2, (2 * height / 3));
	var vel = createVector();
	var acc = createVector();
	var lastPos = createVector();
	var heading = 0;
	var hitbox = [];
	hitbox.push(new Hitbox(pos.x - (size / 10), pos.y - (size / 2.2), (size / 5), (size / 2), pos.x, pos.y));
	hitbox.push(new Hitbox(pos.x - (size / 3.6), pos.y - (size / 9), (size / 1.8), (size / 1.7), pos.x, pos.y));
	var alive = true;
	var shootCoolDown = 0;
	var hyperSpeed = false;

	this.getX = function() {
		return pos.x;
	};

	this.getY = function() {
		return pos.y;
	};

	this.getVelX = function() {
		return vel.x;
	};

	this.getVelY = function() {
		return vel.y;
	};

	this.getHyper = function() {
		return hyperSpeed;
	};
	this.getLastPos = function() {
		return lastPos;
	};

	this.getSize = function() {
		return size;
	};

	this.alive = function() {
		return alive;
	};

	this.update = function() {
		vel.mult(.95);

		if (hyperSpeed) {
			console.log("hyperSpeed");
			if (!keyIsDown(UP)) {
				hyperSpeed = false;
			}
			pos.y -= 100;
		}
		else {
			if (keyIsDown(RIGHT)) {
				acc.x = MOVESPEED;
			}
			else if (keyIsDown(LEFT)) {
				acc.x = -MOVESPEED;
			}
			else {
				acc.x = 0;
			}
			if (keyIsDown(UP)) {
				acc.y = -MOVESPEED;
			}
			else if (keyIsDown(DOWN)) {
				acc.y = MOVESPEED;
			}
			else {
				acc.y = 0;
			}

			lastPos = pos.copy();
			if (abs(vel.x) > .05 || abs(vel.y) > .05) {
				pos.add(vel);
			} else {
				vel.x = 0;
				vel.y = 0;
			}
			vel.add(acc);
			vel.limit(MAXSPEED);
			if (vel.y < -MAXSPEED / 1.1) {
				hyperSpeed = true;
			}
		}

		if (shootCoolDown > 0) {
			shootCoolDown--;
		}

		checkBoundaries();
		checkCollisions();

		updateHitbox();
	};

	var updateHitbox = function() {
		for (let h of hitbox) {
			h.update(pos.x, pos.y);
		}
	};

	var checkBoundaries = function() {
		if (pos.x > BOUNDARY) {
			vel.x = -.5;
		}
		else if (pos.x < -BOUNDARY) {
			vel.x = .5;
		}
		if (pos.y > BOUNDARY) {
			vel.y = -.5;
		}
		else if (pos.y < -BOUNDARY) {
			vel.y = .5;
		}
	};

	var checkCollisions = function() {
		for (let l of lasers) {
			if (abs(pos.x - l.getX()) + abs(pos.y - l.getY()) < size + l.getSize()) {
				for (let h of hitbox) {
					if (h.checkCollided(l.getHitbox())) {
						alive = false;
					}
				}
			}
		}
		for (let e of enemies) {
			if (abs(pos.x - e.getX()) + abs(pos.y - e.getY()) < size + e.getSize()) {
				ehit = e.getHitbox();
				for (let h of hitbox) {
					for (let enemyh of ehit) {
						if (h.checkCollided(enemyh)) {
							alive = false;
						}
					}
				}
			}
		}
	};

	this.destroy = function() {
		alive = false;
	};

	this.fire = function() {
		if (shootCoolDown <= 0 && alive) {
			lasers.push(new Laser(pos.x, pos.y - size, 0));
			// lasers.push(new Laser(width / 2, (2 * height / 3) - size, 0));

			shootCoolDown = 6;
		}
	};

	this.display = function() {

		if (showHitboxes) {
			rectMode(CORNERS);
			for (let h of hitbox) {
				h.display();
			}
			rectMode(CORNER);
		}

		// fill(50, 255, 50, 50);
		// ellipse(pos.x, pos.y, size);

		image(playerTexture, pos.x - (size / 2), pos.y - (size / 2), size, size);

	};
}
