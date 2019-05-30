function Enemy() {

	const size = ENEMYSIZE;
	var moveSpeed = 10;
	var alive = false;
	var moveSide = true;

	var hitbox = [];

	var target = createVector();
	var pos = createVector();
	var vel = createVector();
	var acc = createVector();

	// this.color = [];

	this.getHitbox = function() {
		return hitbox;
	};

	this.getX = function() {
		return pos.x;
	};

	this.getY = function() {
		return pos.y;
	};

	this.getSize = function() {
		return size;
	};

	this.getAlive = function() {
		return alive;
	};

	this.reset = function(_x, _y) {
		if (!alive) {
			pos.x = _x * enemyScaleX + 30;
			pos.y = _y * enemyScaleY;
			alive = true;
			moveSide = true;
			//body
			hitbox.push(new Hitbox(pos.x - (size / 4), pos.y - (size / 6), (size / 2), (size / 3), pos.x, pos.y));
			//left wing
			hitbox.push(new Hitbox(pos.x - (size / 4), pos.y - (size / 2.5), (size / 12), (size / 1.25), pos.x, pos.y));
			//right wing
			hitbox.push(new Hitbox(pos.x - (-size / 4), pos.y - (size / 2.5), (-size / 12), (size / 1.25), pos.x, pos.y));
		}
	};

	this.update = function() {
		if (moveSide) {
			// if (frameCount % 120 < 30 || frameCount % 120 >= 90) {
			// 	pos.x++;
			// 	// x += (random(.5, 1.5));
			// }
			// else {
			// 	pos.x--;
			// 	// x -= (random(.5, 1.5));
			// }
		}
		else {

			vel.mult(.95);

			var attract = createVector(target.x, target.y);

			attract.sub(pos);
			pos.add(vel);
			vel.add(acc);
			// vel.x = constrain(vel.x, 0, 20);
			// vel.y = constrain(vel.y, 0, 20);

			acc = attract.mult(.001);

			if (dist(pos.x, pos.y, target.x, target.y) < 2) {
				moveSide = true;
				target = createVector();
				attract = createVector();
				vel = createVector();
				acc = createVector();
			}
		}

		hitbox[0].update(pos.x, pos.y);

		this.checkCollisions();
	};

	this.checkCollisions = function() {
		for (let l of lasers) {
			if (abs(pos.x - l.getX()) + abs(pos.y - l.getY()) < size + l.getSize()) {
				for (let h of hitbox) {
					if (h.checkCollided(l.getHitbox())) {
						l.destroy(this);
						alive = false;
					}
				}
			}
		}
	};

	this.moveTo = function(_x, _y) {
		moveSide = false;
		target = createVector(_x, _y);
	};

	this.destroy = function() {
		if (abs(pos.x - player.getX()) + abs(pos.y - player.getY()) < size + player.getSize()) {
			alive = false;
		}
	};

	this.display = function() {
		if (alive) {
			if (showHitboxes) {
				rectMode(CORNERS);
				for (let h of hitbox) {
					h.display();
				}
				rectMode(CORNER);
			}
			// fill(200, 230, 210, 40);
			// ellipse(pos.x, pos.y, 2 * size);
			image(enemyTexture, pos.x - size / 2, pos.y - size / 2, size, size);
		}
	};

}