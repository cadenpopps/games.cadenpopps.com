function Particle() {

	this.isF = false;
	this.parentSize = 0;
	this.size = 0;
	this.lifetime = 0;
	this.x = 0;
	this.y = height + 100;
	this.velx = 0;
	this.vely = 0;
	this.active = false;
	this.col = new Array(3);

	this.reset = function (_parentSize, _x, _y, _col) {
		this.parentSize = _parentSize;
		this.size = this.parentSize / (random(2, 3)) + 1;
		if (this.size < 4) {
			this.size = 4;
		}
		this.lifetime = 0;
		this.x = _x;
		this.y = _y;
		var velXMult = random(-PARTICLE_SPEED, PARTICLE_SPEED);
		var velYMult = random(-PARTICLE_SPEED, 2);
		this.velx = (1 / this.size) * velXMult;
		this.vely = (1 / this.size) * velYMult;
		this.active = true;
		this.col[0] = _col[0];
		this.col[1] = _col[1];
		this.col[2] = _col[2];
		if (this.size < 2) {
			this.active = false;
		}
	};

	this.getX = function () {
		return this.x;
	}
	this.getY = function () {
		return this.y;
	}

	this.getSize = function () {
		return this.size;
	}

	this.destroy = function () {
		this.active = false;
	}

	this.update = function () {

		this.vely += PARTICLE_GRAVITY;

		this.velx *= RESISTANCE;
		this.vely *= RESISTANCE;

		this.x += this.velx;
		this.y += this.vely;

		this.lifetime++;

		if (abs(this.velx) < .05 && abs(this.vely) < .05 || this.size < .3) {
			this.destroy();
		}

		if (this.lifetime % 10 == 1) {
			this.size -= .2;
		}

	};

	this.display = function () {
		fill(this.col[0], this.col[1], this.col[2]);
		point(this.x, this.y, this.size);
	};

}