function Food(_x, _y) {

	var pos = createVector(_x, _y);
	var originalPos = createVector(_x, _y);
	var size = floor(random(4, 14));
	var floatCounter = 0;
	var floatSpeed = random(.2, .5)/size/2;

	this.getPos = function () {
		return pos;
	};

	this.getSize = function () {
		return size;
	};

	this.update = function () {
		floatCounter++;
		pos.x = oscSpeed(floatCounter, 0, size*4, floatSpeed) + originalPos.x;
		pos.y = oscSpeed(floatCounter, 0, size, floatSpeed, NEGATIVE) + originalPos.y;
	};

	this.display = function () {
		fill(240);
		point(pos.x, pos.y, size);
	};

}