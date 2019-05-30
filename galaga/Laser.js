function Laser(_x, _y, _shooter) {

	var x = _x;
	var y = _y;
	var prevY;
	var size = 50;
	var shooter = _shooter;
	var alive = true;
	var hitbox = new Hitbox(x - (size / 20), y - (size / 20), (size / 10), size * 1.1, x, y);

	this.getHitbox = function() {
		return hitbox;
	};

	this.getX = function() {
		return x;
	};

	this.getY = function() {
		return y;
	};

	this.getSize = function() {
		return size;
	};

	this.alive = function() {
		return alive;
	}

	this.update = function() {
		if (shooter == 0) {
			if (player.getHyper()) {
				y -= 110;
			} else {
				y -= 35;
			}
		}

		if (y > player.getY() + (height * 3) || y < player.getY() - (height * 3)) {
			alive = false;
		}

		hitbox.update(x, y);
	};

	this.destroy = function(collidedWith) {

		if (abs(x - collidedWith.getX()) + abs(y - collidedWith.getY()) < size + collidedWith.getSize()) {
			alive = false;
		}

	};

	this.display = function() {
		strokeWeight(size / 10);
		stroke(255, 0, 0);
		line(x, y, x, y + size);
		noStroke();

		if (showHitboxes) {
			rectMode(CORNERS);
			hitbox.display();
			rectMode(CORNER);
		}
	};

}