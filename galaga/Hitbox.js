function Hitbox(x, y, sizex, sizey, parx, pary) {

	this.x1 = x;
	this.y1 = y;
	this.x2 = x + sizex;
	this.y2 = y + sizey;
	this.parentX = parx;
	this.parentY = pary;
	this.rotation = 0;

	this.update = function(x, y) {
		var shiftX = this.parentX - x;
		var shiftY = this.parentY - y;
		this.x1 -= shiftX;
		this.y1 -= shiftY;
		this.x2 -= shiftX;
		this.y2 -= shiftY;
		this.parentX = x;
		this.parentY = y;
	};

	this.checkCollided = function(otherBox) {
		if (this.x1 > otherBox.x2 || this.x2 < otherBox.x1 || this.y1 > otherBox.y2 || this.y2 < otherBox.y1) {
			return false;
		}
		return true;
	};

	this.display = function() {
		fill(255, 255, 0, 200);
		rect(this.x1, this.y1, this.x2, this.y2);
	};

}