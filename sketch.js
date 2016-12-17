const SPACE_BAR = 32;
var DEBUG_RENDER = false;

var ship;
var bullets = [];
var asteroids = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();

    for (var i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    angleMode(DEGREES);
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

    for (var i = bullets.length - 1; i >= 0; i--) {
        var bullet = bullets[i];
        bullet.draw();

        for (var j = asteroids.length - 1; j >= 0; j--) {
            var asteroid = asteroids[j];

            if (bulletCollides(bullet, asteroid)) {
                if (asteroid.radius > 15) {
                    asteroids.push(new Asteroid(asteroid.position, asteroid.radius / 2));
                    asteroids.push(new Asteroid(asteroid.position, asteroid.radius / 2));
                }

                bullets.splice(i, 1);
                asteroids.splice(j, 1);

                break;
            }
        }
    }
}

function bulletCollides(bullet, object) {
    return dist(bullet.position.x, bullet.position.y, object.position.x, object.position.y) <= object.radius;
}

function keyPressed() {
    if (keyCode === SPACE_BAR) {
        var b = new Bullet(ship.getShotPosition(), ship.velocity, ship.heading);
        bullets.push(b);

        setTimeout(function () {
            var idx = bullets.indexOf(b);
            if (idx != -1) {
                bullets.splice(idx, 1);
            }
        }, 5000);
    } else if (key === 'D') {
        DEBUG_RENDER = !DEBUG_RENDER;
    }
}
