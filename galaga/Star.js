function Star() {

	this.x = random(-2000, 2000);
	this.y = random(-1500, 1500);
	this.size = abs(randomGaussian(2, 3));

	this.reset = function(side) {
		switch (side) {
			case 0:
				this.x = player.getX() - (width / 2) + random(width);
				this.y = player.getY() - (2 * height / 3) + random(-STARDIST, -10);
				break;
			case 1:
				this.x = player.getX() - (width / 2) + random(width);
				this.y = player.getY() + (2 * height / 3) + random(10, STARDIST);
				break;
			case 2:
				this.x = player.getX() - (width / 2) + random(-STARDIST, -10);
				this.y = player.getY() - (2 * height / 3) + random(height);
				break;
			case 3:
				this.x = player.getX() + (width / 2) + random(10, STARDIST);
				this.y = player.getY() - (2 * height / 3) + random(height);
				break;
		}
		this.size = abs(randomGaussian(2, 3));
	};

	this.update = function() {
		if (player.getLastPos().x != player.getX() || player.getLastPos().y != player.getY()) {
			this.x += (player.getLastPos().x - player.getX()) * (this.size) / 50;
			this.y += (player.getLastPos().y - player.getY()) * (this.size) / 50;
		}
		if (this.y > player.getY() + (2 * height / 3) + STARDIST) {
			this.reset(0);
		}
		else if (this.y < player.getY() - (2 * height / 3) - STARDIST) {
			this.reset(1);
		}
		else if (this.x > player.getX() + (width / 2) + STARDIST) {
			this.reset(2);
		}
		else if (this.x < player.getX() - (width / 2) - STARDIST) {
			this.reset(3);
		}
	};

	this.display = function() {
		stroke(255, 255 - (this.size * 8), 255 - (this.size * 20));
		strokeWeight(this.size);
		if (!player.getHyper()) {
			point(this.x, this.y);
		} else {
			line(this.x, this.y, this.x, this.y + (this.size * 10));
		}
		noStroke();
	};

}