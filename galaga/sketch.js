var player;
var enemies;
var lasers = [];
var stars;
const ENEMYAMOUNT = 30;
const SQUADAMOUNT = ENEMYAMOUNT / 3;
const STARAMOUNT = 100;
const ENEMYSIZE = 128;
const UP = 87;
const DOWN = 83;
const RIGHT = 68;
const LEFT = 65;
const STARDIST = 300;
const BOUNDARY = 50000;
var enemyScaleX;
var enemyScaleY;

var showHitboxes = false;

function preload() {
	playerTexture = loadImage("data/fighter.png");
	enemyTexture = loadImage("data/enemy.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	enemyScaleX = (width - 200) / (ENEMYAMOUNT / (ENEMYAMOUNT / 10));
	enemyScaleY = (height / 3) / (ENEMYAMOUNT / 10);
	enemies = new Array(ENEMYAMOUNT);
	squads = new Array(SQUADAMOUNT);
	stars = new Array(STARAMOUNT);
	for (var i = 0; i < ENEMYAMOUNT; i++) {
		enemies[i] = new Enemy();
	}
	for (var i = 0; i < SQUADAMOUNT; i++) {
		var children = new Array(3);
		children[0] = enemies[i];
		children[1] = enemies[i % SQUADAMOUNT + SQUADAMOUNT];
		children[2] = enemies[i % SQUADAMOUNT + SQUADAMOUNT + SQUADAMOUNT];
		squads[i] = new Squad(i, children);
	}

	rectMode(CORNERS);

	init();
}

function draw() {

	background(30);
	noStroke();

	fill(0, 255, 255);
	text(player.getX() + "   " + player.getY(), 50, 50);
	text(player.getVelX() + "   " + player.getVelY(), 50, 70);

	push();
	translate((width / 2) - player.getX(), (2 * height / 3) - player.getY());

	for (let s of stars) {
		s.display();
	}

	for (let e of enemies) {
		e.display();
	}

	for (let l of lasers) {
		l.display();
	}

	player.display();
	pop();

	update();

	// fill(255);
	// rect(width / 2 - 1, 0, 2, height);
}

function update() {
	if (player.alive()) {
		player.update();
		for (let e of enemies) {
			e.update();
		}
		for (var i = enemies.length - 1; i >= 0; i--) {
			if (!enemies[i].getAlive()) {
				enemies.splice(i, 1);
			}
		}
		for (let l of lasers) {
			l.update();
		}
		for (var i = lasers.length - 1; i >= 0; i--) {
			if (!lasers[i].alive()) {
				lasers.splice(i, 1);
			}
		}
		for (let s of stars) {
			s.update();
		}
	}
}

function init() {

	player = new Player();

	for (var i = 0; i < STARAMOUNT; i++) {
		stars[i] = new Star();
	}

	var enemyY = 1;
	for (var i = 0; i < ENEMYAMOUNT; i++) {
		enemies[i].reset(i % 10 + 1, enemyY);
		if (i % 10 == 9) {
			enemyY++;
		}
	}

}

function keyTyped() {
	if (keyIsDown(32)) {
		player.fire();
	}
	if (key == 'h') {

		showHitboxes = !showHitboxes;
	}
}

function mousePressed() {
	player.fire();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
