var fireworks = new Array(18);
var particles = new Array(150);
var obstacles = [];
var alive;
var score;
var millisLost;
var helpTextTimer;

const MOUSESIZE = 12;
const GRAVITY = .002;
const PARTICLE_GRAVITY = GRAVITY * 10;
const RESISTANCE = .998;
const FIREWORK_SPEED = 5;
const PARTICLE_SPEED = 15;
const FIREWORK_SPAWN_DISTANCE = 350;
const SPAWN_RATE = .15;
const MAX_PARTICLES = 12;

var currentFireworkSpeed = FIREWORK_SPEED;


function setup() {
	createCanvas(windowWidth, windowHeight);

	background(5);

	mouseX = width / 2;
	mouseY = height / 2 - 50;

	// init();

	helpTextTimer = setTimeout(function () {
		document.getElementById("restartHelpText").style.opacity = 1;
	}, 1200);
}

function draw() {

	background(5);
	update();


	for (let o of obstacles) {
		if (o.active) {
			o.display();
		}
	}

	fill(240);
	point(mouseX, mouseY, MOUSESIZE);
}

function checkCollisions() {

	for (let o of obstacles) {
		if (o.active) {
			if (abs(o.getX() - mouseX) < (o.getSize() + MOUSESIZE) * 4 && abs(o.getY() - mouseY) < (o.getSize() + MOUSESIZE) * 4) {
				if (dist(o.getX(), o.getY(), mouseX, mouseY) < o.getSize() + MOUSESIZE) {
					deathSequence();
				}
			}
		}
	}

	for (let o of obstacles) {
		if (o.active) {
			for (let s of obstacles) {
				if (s != o && s.active) {
					if (abs(o.getX() - s.getX()) < (o.getSize() + s.getSize()) * 4 && abs(o.getY() - s.getY()) < (o.getSize() + s.getSize()) * 4) {
						if (dist(o.getX(), o.getY(), s.getX(), s.getY()) < o.getSize() + s.getSize()) {
							if (!o.isF && o.lifetime > 50) {
								o.destroy();
							}
							if (!s.isF && s.lifetime > 50) {
								s.destroy();
							}
							if (o.isF && s.isF) {
								if (o.getSize() - 15 > s.getSize()) {
									s.requestParticles();
									s.destroy();
								}
								else if (s.getSize() - 15 > o.getSize()) {
									o.requestParticles();
									o.destroy();
								}
								else {
									o.requestParticles();
									o.destroy();
									s.requestParticles();
									s.destroy();
								}
							}
						}
					}
				}
			}
		}
	}
}

function update() {
	if (alive) {
		if (random(1) < SPAWN_RATE) {
			requestFirework();
		}

		if (frameCount % 30 == 0) {
			score++;
			document.getElementById("score").innerHTML = score;
		}
		if (frameCount % 300 == 0) {
			currentFireworkSpeed = ((currentFireworkSpeed * 10) + 1) / 10;
		}

		for (var i = fireworks.length - 1; i >= 0; i--) {
			if (fireworks[i].active) {
				fireworks[i].update();
			}
		}
		for (var i = particles.length - 1; i >= 0; i--) {
			if (particles[i].active) {
				particles[i].update();
			}
		}
		checkCollisions();
	}
}

function requestFirework() {
	for (let f of fireworks) {
		if (!f.active) {
			f.reset();
			return;
		}
	}
}

function init() {
	clearTimeout(helpTextTimer);
	document.getElementById('welcomeText').style.opacity = 0;
	setTimeout(function () {
		document.getElementById('restartHelpText').innerHTML = "Click or press any key to restart";
		document.getElementById('restartHelpText').style.transform = "translateY(-120%)";
	}, 200);
	document.getElementById('restartHelpText').style.opacity = 0;
	document.getElementById('yourScoreText').style.opacity = 0;
	document.getElementsByTagName('body')[0].style.cursor = "none";
	document.getElementById('scoreText').style.opacity = 1;


	obstacles = [];
	currentFireworkSpeed = FIREWORK_SPEED;

	alive = true;
	score = 0;
	millisLost = 0;

	for (var i = 0; i < fireworks.length; i++) {
		fireworks[i] = new Firework();
	}
	for (var i = 0; i < particles.length; i++) {
		particles[i] = new Particle();
	}

	for (let f of fireworks) {
		obstacles.push(f);
	}
	for (let p of particles) {
		obstacles.push(p);
	}

	if (!looping) {
		loop();
	}
}

function deathSequence() {
	millisLost = millis();
	alive = false;

	document.getElementsByTagName('body')[0].style.cursor = "default";
	document.getElementById('scoreText').style.opacity = 0;

	document.getElementById('yourScore').innerHTML = score;
	document.getElementById('yourScoreText').style.opacity = 1;
	helpTextTimer = setTimeout(function () {
		document.getElementById("restartHelpText").style.opacity = 1;
	}, 1200);

	noLoop();
}

function keyPressed() {
	if (!alive) {
		init();
	}
}

function mouseMoved() {}

function mouseClicked() {
	if (!alive) {
		init();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(5, 5, 5);
}
