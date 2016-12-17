function Asteroid(position, radius) {
    if (position) {
        this.position = position.copy();
    } else {
        this.position = createVector(random(width), random(height));
    }

    if (radius) {
        this.radius = radius;
    } else {
        this.radius = random(20, 50);
    }

    this.velocity = p5.Vector.random2D().mult(random(0.1, 2));
    this.heading = 0;
    this.spinSpeed = random(-1, 1);

    this.vertices = floor(random(7, 15));
    this.offsets = [];

    for (var i = 0; i < this.vertices; i++) {
        this.offsets[i] = random(-this.radius * 0.2, this.radius * 0.8);
    }

    this.draw = function () {
        this.update();
        this.render();
    }

    this.update = function () {
        this.position.add(this.velocity);
        this.heading += this.spinSpeed;
        if (this.heading >= 360) {
            this.heading -= 360;
        } else if (this.heading <= -360) {
            this.heading += 360;
        }

        if (this.position.x > width + this.radius) {
            this.position.x = -this.radius;
        } else if (this.position.x < -this.radius) {
            this.position.x = width + this.radius;
        }

        if (this.position.y > height + this.radius) {
            this.position.y = -this.radius;
        } else if (this.position.y < -this.radius) {
            this.position.y = height + this.radius;
        }
    }

    this.render = function () {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.heading);

        fill(0);
        stroke(255);

        beginShape();
        for (var i = 0; i < this.vertices; i++) {
            var angle = map(i, 0, this.vertices, 0, 360);

            var r = this.radius + this.offsets[i];
            var x = r * cos(angle);
            var y = r * sin(angle);

            vertex(x, y);
        }
        endShape(CLOSE);

        if (DEBUG_RENDER) {
            noFill();
            stroke(255, 0, 0);
            ellipse(0, 0, this.radius * 2);
        }

        pop();
    }
}
