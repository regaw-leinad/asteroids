const SPACE_BAR = 32;

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

    asteroids.forEach(function (asteroid) {
        asteroid.draw();
    });

    ship.draw();
}

function keyPressed() {
    if (keyCode === SPACE_BAR) {
        ship.shoot();
    }
}
