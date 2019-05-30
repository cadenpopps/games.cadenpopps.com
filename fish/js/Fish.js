function Fish(parentPos, parentSize, parentSpeed, parentColor) {

	var pos = createVector();
	var vel = createVector();
	var acc = createVector();
	var offset = createVector();

	offset.x = random(-FISHDENSITY, FISHDENSITY);
	offset.y = random(-FISHDENSITY, FISHDENSITY);

	pos.x = parentPos.x + offset.x;
	pos.y = parentPos.y + offset.y;

	var size = parentSize + random(FISHSIZE - (FISHSIZE / 2), FISHSIZE + (FISHSIZE / 2));
	var speed = parentSpeed * FISHSPEEDLIMIT / (size / 5);
	if (speed < 1) {
		speed = 1;
	}
	var wiggleOffset = floor(random(250));

	var color = new Array(3);
	color[0] = parentColor[0] + floor(random(-10, 10));
	color[1] = parentColor[1] + floor(random(-10, 10));
	color[2] = parentColor[2] + floor(random(-10, 10));

	var food = false;
	var closestFood = 100000;
	var attractX = 0;
	var attractY = 0;
	var distFood = 0;

	this.update = function (parentPos) {

		vel.mult(.95);
		vel.x = constrain(vel.x, -speed, speed);
		vel.y = constrain(vel.y, -speed, speed);

		if (random(1) < FISH_MOVE_RATE) {
			offset.x = constrain(offset.x + random(-30, 30), -FISHDENSITY, FISHDENSITY);
			offset.y = constrain(offset.y + random(-30, 30), -FISHDENSITY, FISHDENSITY);
		}

		food = false;
		closestFood = 1000000;
		distFood = 10000;

		for (var i = foods.length - 1; i >= 0; i--) {
			var foodPos = foods[i].getPos();
			distFood = abs(pos.x - foodPos.x) + abs(pos.y - foodPos.y);
			if (distFood < 800) {
				food = true;
				if (distFood < closestFood) {
					closestFood = distFood;
					attractX = foodPos.x + random(-200, 200);
					attractY = foodPos.y + random(-200, 200);
				}
				if (distFood < 150) {
					if (dist(pos.x, pos.y, foodPos.x, foodPos.y) < (size + foods[i].getSize()) / 2) {
						foods.splice(i, 1);
						size += 10;
					}
					else {
						attractX = foodPos.x + random(-5, 5);
						attractY = foodPos.y + random(-5, 5);
					}
				}
			}
		}

		if (!food) {
			attractX = parentPos.x + offset.x;
			attractY = parentPos.y + offset.y;
		}

		if ((millis() + wiggleOffset) % 500 < 250) {
			attractX = pos.x;
		}
		else {
			attractY = pos.y;
		}

		attractX -= pos.x;
		attractY -= pos.y;
		pos.add(vel);
		vel.add(acc);
		if (food) {
			acc.x = attractX * (.005 * (FISHSPEEDLIMIT / 20));
			acc.y = attractY * (.005 * (FISHSPEEDLIMIT / 20));

		}
		else {
			acc.x = attractX * (.001 * (FISHSPEEDLIMIT / 20));
			acc.y = attractY * (.001 * (FISHSPEEDLIMIT / 20));
		}
	};

	this.display = function () {
		fill(color[0], color[1], color[2]);
		ellipse(pos.x, pos.y, size, size);
	};

}