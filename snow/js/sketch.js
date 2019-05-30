

const BOUNDARY_X = 50;
const BOUNDRARY_Y = 50;

const MIN_SIZE = 5;
const MAX_SIZE = 20;
const MIN_DIST = 1;
const MAX_DIST = 8;
const CLOSE_DISTANCE = 4;
const DENSITY = 180;
const WIND_STRENGTH = 1.6;
const WIND_VARIABLILITY = .25;
const WIND_CHANGE_RATE = 30;

const GRAVITY = 1.6;
const RESISTANCE = .98;
const PARALLAX_MULT = 2;

let snows = [];
let wind;
let farWind;

function setup() {
    createCanvas(windowWidth, windowHeight);

    wind = new Vector(random(-WIND_STRENGTH, WIND_STRENGTH), 0);
    farWind = new Vector(random(-WIND_STRENGTH / 2, WIND_STRENGTH / 2), 0);

    start();

    loop();
}

function draw() {
    background(20, 20, 35);
    update();
    for (let s of snows) {
        s.display();
    }
}

function update() {
    if (oneIn(WIND_CHANGE_RATE)) {
        wind.x = constrain(wind.x + random(-WIND_VARIABLILITY, WIND_VARIABLILITY), -WIND_STRENGTH, WIND_STRENGTH);
        wind.y = constrain(wind.y + random(-WIND_VARIABLILITY / 2, WIND_VARIABLILITY / 2), -WIND_STRENGTH / 3, WIND_STRENGTH / 3);
        if (abs(wind.x) < .2) {
            wind.x = constrain(wind.x + random(-WIND_VARIABLILITY, WIND_VARIABLILITY), -WIND_STRENGTH, WIND_STRENGTH);
        }

        farWind.x = constrain(farWind.x + random(-WIND_VARIABLILITY, WIND_VARIABLILITY), -WIND_STRENGTH / 4, WIND_STRENGTH / 4);
        farWind.y = constrain(farWind.y + random(-WIND_VARIABLILITY / 4, WIND_VARIABLILITY / 4), -WIND_STRENGTH / 6, WIND_STRENGTH / 6);
        if (abs(wind.x) < .3) {
            farWind.x = constrain(farWind.x + random(-WIND_VARIABLILITY, WIND_VARIABLILITY), -WIND_STRENGTH / 4, WIND_STRENGTH / 4);
        }
    }

    for (let s of snows) {
        s.update();
    }
}

function start() {
    let interval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
            snows.push(new Snow());
        }
        if (snows.length >= DENSITY) {
            clearInterval(interval);
        }
    }, 50);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}