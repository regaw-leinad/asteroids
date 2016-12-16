const SPACE_BAR = 32;
var DEBUG_RENDER = false;

var ship;
var asteroids = [];

function setup() {
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();

    for (var i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);

    if (DEBUG_RENDER) {
        stroke(255);
        textSize(20);
        var w = textWidth('DEBUG');
        text('DEBUG', width - w - 5, height - 5);
    }

    asteroids.forEach(function (asteroid) {
        asteroid.draw();
    });

    ship.draw();
}

function keyPressed() {
    if (keyCode === SPACE_BAR) {
        ship.shoot();
    } else if (key === 'D') {
        DEBUG_RENDER = !DEBUG_RENDER;
    }
}
