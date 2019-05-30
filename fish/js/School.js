
function School(startX, startY) {

	var pos = createVector();
	var vel = createVector();
	var acc = createVector();
	var fish = new Array(floor(random(SCHOOLPOPULATION * .3, SCHOOLPOPULATION * 2)));

	if (startX && startY) {
		pos.set(startX, startY);
	}
	else {
		var edge = floor(random(4));
		switch (edge) {
			case 0:
				pos.x = random(-100, width + 100);
				pos.y = -(BOUNDARY - FISHDENSITY * 2);
				break;
			case 1:
				pos.x = width + (BOUNDARY - FISHDENSITY * 2);
				pos.y = random(-100, width + 100);
				break;
			case 2:
				pos.x = random(-100, width + 100);
				pos.y = height + (BOUNDARY - FISHDENSITY * 2);
				break;
			case 3:
				pos.x = -(BOUNDARY - FISHDENSITY * 2);
				pos.y = random(-100, height + 100);
				break;
		}
	}

	var target = createVector(random(0, width), random(0, height));
	target.x = constrain(target.x, pos.x - 300, pos.x + 300);
	target.y = constrain(target.y, pos.y - 300, pos.y + 300);


	(function () {
		var size = random(FISHSIZE, FISHSIZE * 1.5) / (fish.length / SCHOOLPOPULATION);
		var speed = random(.7, 1.3) / (size / 20);


		var color = new Array(3);
		color[1] = floor(random(50, 240));
		color[0] = floor(random(0, 90));
		color[2] = floor(random(120, 255));

		for (var i = 0; i < fish.length; i++) {
			fish[i] = new Fish(pos, size, speed, color);
		}
	})();

	this.update = function () {
		vel.mult(.95);

		var closestFood = 1000000;

		for (var i = foods.length - 1; i >= 0; i--) {
			var foodPos = foods[i].getPos();
			var distFood = abs(pos.x - foodPos.x) + abs(pos.y - foodPos.y);
			if (distFood < 800) {
				if (distFood < closestFood) {
					closestFood = distFood;
					target = createVector(foodPos.x, foodPos.y);
				}
			}
		}

		var attract = createVector(target.x, target.y);

		attract.sub(pos);
		pos.add(vel);
		vel.add(acc);
		acc = attract.mult(.001);

		//shift target position
		if (random(1) < SCHOOLMOVESPEED) {
			target.x += random(-40, 40);
			target.y += random(-40, 40);
		}

		for (let f of fish) {
			f.update(pos);
		}

		return constrainPos();

	};

	var constrainPos = function () {
		if (pos.x < -BOUNDARY || pos.x > width + BOUNDARY) {
			return true;
		}
		if (pos.y < -BOUNDARY || pos.y > height + BOUNDARY) {
			return true;
		}
		return false;
	};

	this.display = function () {
		for (let f of fish) {
			f.display();
		}

		stroke(255, 0, 0);
		point(pos.x, pos.y, 30);
		noStroke();
	};

}